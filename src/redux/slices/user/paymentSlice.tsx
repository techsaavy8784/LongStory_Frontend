import { createSlice } from "@reduxjs/toolkit";
import { Payment } from "@/types/user";
import { dispatch } from "@/redux/store";
import axios from "@/utils/axios";

interface paymentState {
  error: object | string | null;
  payments: Payment[];
  payment: Payment | null;
  loading: boolean;
}

const initialState: paymentState = {
  error: null,
  payments: [],
  payment: null,
  loading: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    //used
    addPaymentSuccess: (state, action) => {
      state.payments.push(action.payload);
      state.loading = false;
    },
    getPaymentsSuccess: (state, action) => {
      state.payments = action.payload;
      state.loading = false;
    },
    getPaymentSuccess: (state, action) => {
      state.payment = action.payload;
      state.loading = false;
    },
    deletePaymentSuccess: (state, action) => {
      state.payments = state.payments.filter(
        (payment) => payment.id === action.payload
      );
      state.loading = false;
    },
    editPaymentSuccess: (state, action) => {
      state.payment = action.payload;
      state.loading = false;
    },
    setAsDefaultSuccess: (state, action) => {
      state.payments = state.payments.map((payment, index) => {
        if (payment.id === action.payload) {
          payment.is_default = true;
        } else {
          payment.is_default = false;
        }
        return payment;
      });
      state.loading = false;
    },
    //used
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { addPaymentSuccess, getPaymentsSuccess, setLoading, hasError } =
  paymentSlice.actions;

export default paymentSlice.reducer;

export const fetchPayments = async () => {
  dispatch(setLoading());
  const response = await axios.get(`/api/users/payment/`);

  dispatch(paymentSlice.actions.getPaymentsSuccess(response.data));
};

export const addPayment = async (payment: Payment) => {
  // dispatch(setLoading());
  const response = await axios.post(`/api/users/payment/`, payment);
  console.log(response.data);
  dispatch(paymentSlice.actions.addPaymentSuccess(response.data));
};
export const setAsDefault = async (payment_id: number | undefined) => {
  // dispatch(setLoading());
  const response = await axios.put(`/api/users/payment/${payment_id}`, {
    is_default: true,
  });
  dispatch(paymentSlice.actions.setAsDefaultSuccess(payment_id));
};
export const editPayment = async (
  payment: Payment,
  payment_id: number | undefined
) => {
  // dispatch(setLoading());
  const response = await axios.put(`/api/users/payment/${payment_id}`, payment);
  dispatch(paymentSlice.actions.editPaymentSuccess(response.data));
};
export const getPayment = async (payment_id: number | string) => {
  dispatch(setLoading());
  const response = await axios.get(`/api/users/payment/${payment_id}`);
  console.log(response.data);
  dispatch(paymentSlice.actions.getPaymentSuccess(response.data));
};
export const deletePayment = async (payment_id: number | undefined) => {
  dispatch(setLoading());
  const response = await axios.delete(`/api/users/payment/${payment_id}`);
  console.log(response.data);
  dispatch(paymentSlice.actions.deletePaymentSuccess(payment_id));
};
