import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@/redux/store";
import axios from "@/utils/axios";
import { Follow } from "@/types/user";
import { PAGE_SIZE } from "@/constants";

interface FollowState {
  error: object | string | null;
  followers: Follow[];
  followers_total_count: number;
  followers_count: number;
  followees: Follow[];
  followees_total_count: number;
  followees_count: number;
  loading: boolean;
}

const initialState: FollowState = {
  error: null,
  followers: [],
  followers_count: 0,
  followers_total_count: 0,
  followees: [],
  followees_total_count: 0,
  followees_count: 0,
  loading: false,
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getFollowersSuccess: (state, action) => {
      state.followers = action.payload.results;
      state.followers_count = action.payload.count;
      state.loading = false;
    },
    getFolloweesSuccess: (state, action) => {
      state.followees = action.payload.results;
      state.followees_count = action.payload.count;
      state.loading = false;
    },
    getFollowsCount: (state, action) => {
      state.followees_total_count = action.payload.followees_total_count;
      state.followers_total_count = action.payload.followers_total_count;
      state.loading = false;
    },
    updateFollowerSuccess: (state, action) => {
      state.followers = state.followers.map((follow, index) => {
        if (follow.follower_id === action.payload.follower_id) {
          follow.is_accepted = !follow.is_accepted;
        }
        return follow;
      });
    },
    //used
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const {
  getFolloweesSuccess,
  getFollowersSuccess,
  getFollowsCount,
  setLoading,
  updateFollowerSuccess,
  hasError,
} = followSlice.actions;

export default followSlice.reducer;

type Params = {
  p: number;
  page_size: number;
  search?: string;
};
export const fetchFollowers = async (p?: number | string, search?: string) => {
  const params: Params = {
    p: p ? (p as number) : 1,
    page_size: PAGE_SIZE.follow,
  };
  if (search) {
    params.search = search;
  }
  dispatch(setLoading());
  const response = await axios.get(`/api/users/followers`, { params });
  dispatch(followSlice.actions.getFollowersSuccess(response.data));
};

export const fetchFollowees = async (p?: number | string, search?: string) => {
  const params: Params = {
    p: p ? (p as number) : 1,
    page_size: PAGE_SIZE.follow,
  };
  if (search) {
    params.search = search;
  }
  dispatch(setLoading());
  const response = await axios.get(`/api/users/followees`, { params });
  dispatch(followSlice.actions.getFolloweesSuccess(response.data));
};
export const fetchFollowsCount = async () => {
  dispatch(setLoading());
  const response = await axios.get(`/api/users/follows`);
  dispatch(followSlice.actions.getFollowsCount(response.data));
};

export const updateFollower = async (follow: Follow) => {
  // dispatch(setLoading());
  const response = await axios.put(
    `/api/users/followers/${follow.follower_id}`,
    { is_accepted: !follow.is_accepted }
  );
  // dispatch(followSlice.actions.updateFollowerSuccess(follow.follower_id));
};
