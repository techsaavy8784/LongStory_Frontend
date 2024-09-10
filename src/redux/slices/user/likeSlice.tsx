import { createSlice } from "@reduxjs/toolkit";
import { Product, Category } from "@/types/product";
import { Like } from "@/types/product";
import { Address } from "@/types/user";
import { dispatch } from "@/redux/store";
import axios from "@/utils/axios";

interface addressState {
  error: object | string | null;
  likes: Like[];
  loading: boolean;
}

const initialState: addressState = {
  error: null,
  likes: [],
  loading: false,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getLikesSuccess: (state, action) => {
      state.likes = action.payload;
      state.loading = false;
    },
    deleteLikeSuccess: (state, action) => {
      state.likes = state.likes.filter(
        (like) => like.product.id !== action.payload
      );
      state.loading = false;
    },
    //used
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { getLikesSuccess, deleteLikeSuccess, setLoading, hasError } =
  likeSlice.actions;

export default likeSlice.reducer;

export const fetchLikes = async () => {
  dispatch(setLoading());
  const response = await axios.get(`/api/users/like/products`);

  dispatch(likeSlice.actions.getLikesSuccess(response.data));
};

export const deleteLike = async (product_id: number | undefined) => {
  dispatch(setLoading());
  const response = await axios.delete(`/api/users/like/products/${product_id}`);
  dispatch(likeSlice.actions.deleteLikeSuccess(product_id));
};
