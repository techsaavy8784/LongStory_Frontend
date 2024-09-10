import { createSlice } from "@reduxjs/toolkit";
import { Product, Category } from "@/types/product";
import { User } from "@/types/user";
import { dispatch } from "@/redux/store";
import axios from "@/utils/axios";

interface ProductState {
  error: object | string | null;
  users: User[];
  loading: boolean;
  page: number;
  search: string | null;
  hasNext: boolean;
}

const initialState: ProductState = {
  error: null,
  users: [],
  loading: false,
  page: 1,
  hasNext: true,
  search: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    //used
    addUsersSuccess: (state, action) => {
      state.users =
        state.page === 1
          ? action.payload.users
          : [...state.users, ...action.payload.users];
      state.loading = false;
      state.hasNext = action.payload.hasNext;
      
    },
    //used
    setLoading: (state) => {
      state.loading = true;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
      state.hasNext = true;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addFollower: (state, action) => {
      const follow = action.payload;
      state.users = state.users.map((user, index) => {
        if (user.id === follow.followee_id) {
          user.followers.push(follow);
        }
        return user;
      });
    },
    removeFollower: (state, action) => {
      const { followee_id, user_id } = action.payload;
      state.users = state.users.map((user, index) => {
        if (user.id === followee_id) {
          user.followers = user.followers.filter(
            (follow, index) => follow.follower_id != user_id
          );
        }
        return user;
      });
    },
  },
});

export const { addUsersSuccess, setLoading, setPage, setSearch, addFollower } =
  userSlice.actions;

export default userSlice.reducer;

type FetchUsersParams = {
  p: number;
  page_size: number;
  search?: string;
  is_active: boolean;
  order_by?: string;
  desc?: boolean;
};

export const fetchUsers = async (page: number, search: string | null) => {
  let params: FetchUsersParams = {
    p: page,
    page_size: 5,
    is_active: true,
  };
  if (search) {
    params.search = search;
  }
  dispatch(setLoading());
  const response = await axios.get(`/api/users`, { params });
  const { results, next } = response.data;
  dispatch(
    userSlice.actions.addUsersSuccess({
      users: results,
      hasNext: !!next,
    })
  );
};

export const followUser = async (followee_id: number) => {
  // dispatch(setLoading());
  const response = await axios.post(`/api/users/followees/${followee_id}`);
  const follow = response.data;
  dispatch(userSlice.actions.addFollower(follow));
};
export const unFollowUser = async (
  followee_id: number,
  user_id: number | undefined
) => {
  // dispatch(setLoading());
  const response = await axios.delete(`/api/users/followees/${followee_id}`);
  dispatch(userSlice.actions.removeFollower({ followee_id, user_id }));
};
