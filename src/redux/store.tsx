import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "@/redux/slices/auth/authSlice";
// import loginSlice from "./slices/auth/loginSlice";
import productSlice from "./slices/product/productSlice";
import userSlice from "./slices/user/userSlice";
import addressSlice from "./slices/user/addressSlice";
import paymentSlice from "./slices/user/paymentSlice";
import likeSlice from "./slices/user/likeSlice";
import followSlice from "./slices/user/followSlice";
import orderSlice from "./slices/order/orderSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
    address: addressSlice,
    payment: paymentSlice,
    like: likeSlice,
    follow: followSlice,
    order: orderSlice,
  },
});
export const { dispatch } = store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
