import { createSlice } from "@reduxjs/toolkit";
import { Payment } from "@/types/user";
import { dispatch } from "@/redux/store";
import axios from "@/utils/axios";
import { OrderDetail } from "@/types/order";

interface OrderState {
  error: object | string | null;
  orderDetails: OrderDetail[];
  pendingOrderDetail: OrderDetail | null;
  loading: boolean;
}

const initialState: OrderState = {
  error: null,
  orderDetails: [],
  pendingOrderDetail: null,
  loading: false,
};

export const orderSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    //used
    getOrderDetailsSuccess: (state, action) => {
      state.orderDetails = action.payload;
      state.loading = false;
    },
    getPendingOrderDetailSuccess: (state, action) => {
      //
      state.pendingOrderDetail = action.payload;
      state.loading = false;
    },
    addProductToOrderSuccess: (state, action) => {
      if (state.pendingOrderDetail) {
        state.pendingOrderDetail.order_items = [
          action.payload,
          ...state.pendingOrderDetail.order_items,
        ];
      }
    },
    removeProductFromOrderSuccess: (state, action) => {
      if (state.pendingOrderDetail) {
        state.pendingOrderDetail.order_items =
          state.pendingOrderDetail.order_items.filter(
            (orderItem) => orderItem.id !== action.payload
          );
      }
    },
    changeQuantitySuccess: (state, action) => {
      if (state.pendingOrderDetail) {
        state.pendingOrderDetail.order_items =
          state.pendingOrderDetail.order_items.map((orderItem) => {
            if (orderItem.id === action.payload.order_item_id) {
              orderItem.quantity = action.payload.quantity;
            }
            return orderItem;
          });
      }
    },
    updatePendingOrderDetailSuccess: (state, action) => {
      state.pendingOrderDetail = action.payload;
    },
    //used
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const {
  getOrderDetailsSuccess,
  getPendingOrderDetailSuccess,
  setLoading,
  addProductToOrderSuccess,
  removeProductFromOrderSuccess,
  changeQuantitySuccess,
  updatePendingOrderDetailSuccess,
  hasError,
} = orderSlice.actions;

export default orderSlice.reducer;

export const fetchOrderDetails = async () => {
  dispatch(setLoading());
  const response = await axios.get(`/api/orders/orderDetails`);
  dispatch(orderSlice.actions.getOrderDetailsSuccess(response.data));
};
export const fetchPendingOrderDetail = async () => {
  dispatch(setLoading());
  const response = await axios.get(`/api/orders/orderDetails`, {
    params: { order_status: "pending" },
  });
  dispatch(orderSlice.actions.getPendingOrderDetailSuccess(response.data[0]));
};
export const addProductToOrder = async (product_id: number) => {
  dispatch(setLoading());
  const response = await axios.post(`/api/orders/orderItems`, {
    product_id,
  });
  dispatch(orderSlice.actions.addProductToOrderSuccess(response.data));
};
export const removeProductFromOrder = async (
  order_item_id: number | undefined
) => {
  dispatch(setLoading());
  const response = await axios.delete(
    `/api/orders/orderItems/${order_item_id}`
  );
  dispatch(orderSlice.actions.removeProductFromOrderSuccess(order_item_id));
};
export const changeQuantity = async (
  order_item_id: number | undefined,
  quantity: number
) => {
  dispatch(setLoading());
  const response = await axios.put(`/api/orders/orderItems/${order_item_id}`, {
    quantity,
  });
  dispatch(
    orderSlice.actions.changeQuantitySuccess({ order_item_id, quantity })
  );
};
export const updatePendingOrderDetail = async ({
  order_detail_id,
  billing_address_id,
  shipping_address_id,
  payment_id,
  order_status,
}: {
  order_detail_id: number | undefined;
  billing_address_id?: number;
  shipping_address_id?: number;
  payment_id?: number;
  order_status?: string;
}) => {
  dispatch(setLoading());
  const data: {
    billing_address_id?: number;
    shipping_address_id?: number;
    payment_id?: number;
    order_status?: string;
  } = {};
  if (billing_address_id) {
    data.billing_address_id = billing_address_id;
  }
  if (shipping_address_id) {
    data.shipping_address_id = shipping_address_id;
  }
  if (payment_id) {
    data.payment_id = payment_id;
  }
  if (order_status) {
    data.order_status = order_status;
  }
  const response = await axios.put(
    `/api/orders/orderDetails/${order_detail_id}`,
    data
  );
  dispatch(orderSlice.actions.updatePendingOrderDetailSuccess(response.data));
};
