import React, { createContext, useEffect, useReducer } from "react";

// reducer - state management
import { LOGIN, LOGOUT, SET_USER } from "@/redux/actions";
import accountReducer from "@/redux/accountReducer";

// project imports
import axios from "@/utils/axios";
import { setSession } from "@/utils/jwt";
import { InitialLoginContextProps } from "@/types";
import { JWTContextType } from "@/types/auth";

import Router, { useRouter } from "next/router";
import { User as UserProfile } from "@/types/user";
import { UpdatedUserProfile } from "@/types/auth";
import LinearLoading from "@/components/loading/linear";

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const access = window.localStorage.getItem("access");
      const refresh = window.localStorage.getItem("refresh");
      if (access && refresh) {
        try {
          await axios.post("/api/token/verify/", {
            token: access,
          });
          setSession({ access, refresh });
          const response = await axios.get("/api/users/me");
          const { user } = response.data;

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user,
            },
          });
        } catch (err1) {
          try {
            const response = await axios.post("/api/token/refresh/", {
              refresh,
            });
            setSession({ access: response.data.access, refresh });
            const get_user_response = await axios.get("/api/users/me");
            const { user } = get_user_response.data;

            dispatch({
              type: LOGIN,
              payload: {
                isLoggedIn: true,
                user,
              },
            });
          } catch (err) {
            dispatch({
              type: LOGOUT,
            });
          }
        }
      } else {
        dispatch({
          type: LOGOUT,
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/users/signin/", {
      email,
      password,
    });
    const { tokenObj, user } = response.data;
    setSession(tokenObj);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user,
      },
    });
  };
  const setToken = async (
    tokenObj: { refresh: string; access: string },
    user: UserProfile
  ) => {
    setSession(tokenObj);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user,
      },
    });
  };
  const setUser = (user: UserProfile) => {
    dispatch({
      type: SET_USER,
      payload: {
        isLoggedIn: true,
        user,
      },
    });
  };

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    const response = await axios.post("/api/users/signup/", {
      email,
      password,
      username,
    });
    login(email, password);
  };

  const logout = () => {
    setSession({ access: null, refresh: null });
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = async (updatedUserProfile: UpdatedUserProfile) => {
    const formdata = new FormData();
    Object.keys(updatedUserProfile).map((field, index) => {
      if (field === "file" && updatedUserProfile.file) {
        formdata.set("file", updatedUserProfile.file);
      } else {
        formdata.set(field, updatedUserProfile[field] as string);
      }
    });
    const response = await axios.put(
      "/api/users/account/update-user/",
      formdata
    );
    setUser(response.data.user);
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <LinearLoading />;
  }

  return (
    <JWTContext.Provider
      value={{
        ...state,
        login,
        setToken,
        setUser,
        logout,
        register,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
