import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface AuthState {
  isAuthenticated: boolean;
  is_loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    username: string | undefined;
    email: string;
    is_approved: boolean | undefined;
    is_active: boolean | undefined;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  is_loading: false,
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setToken: (state, action) => {
      state = { ...state, ...action.payload };
      state.is_loading = false;
      // state.isAuthenticated = true;
      return state;
    },
    setAuth: (state) => {
      state.isAuthenticated = true;
      return state;
    },
    removeToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    authDoing: (state) => {
      state.is_loading = true;
    },
  },
});

// export const reHydrateTokens = () => {
// 	if (localStorage.getItem("accessToken") !== null) {
// 		return{
//       accessToken: localStorage.getItem("accessToken"),
//       refreshToken: localStorage.getItem("refreshToken")
//     } ; // re-hydrate the store
// 	}
// };

export const { authDoing, setToken, removeToken, setUser, setAuth } =
  authSlice.actions;

export default authSlice.reducer;
