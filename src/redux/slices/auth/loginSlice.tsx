import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface loginState {
  method: "magic" | "email";
  email: string | null;
}

const initialState: loginState = {
  method: "magic",
  email: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setMethod: (state, action) => {
      state.method = action.payload.method!;
      return state;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email!;
      return state;
    },
  },
});

export const { setMethod, setEmail } = loginSlice.actions;

export default loginSlice.reducer;
