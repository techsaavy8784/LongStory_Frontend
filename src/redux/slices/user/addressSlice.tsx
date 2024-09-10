import { createSlice } from "@reduxjs/toolkit";
import { Product, Category } from "@/types/product";
import { Address } from "@/types/user";
import { dispatch } from "@/redux/store";
import axios from "@/utils/axios";

interface addressState {
  error: object | string | null;
  addresses: Address[];
  address: Address | null;
  loading: boolean;
}

const initialState: addressState = {
  error: null,
  addresses: [],
  address: null,
  loading: false,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    //used
    addAddressSuccess: (state, action) => {
      // state.addresses = [...state.addresses, action.payload];
      state.addresses.push(action.payload);
      state.loading = false;
    },
    getAddressesSuccess: (state, action) => {
      state.addresses = action.payload;
      state.loading = false;
    },
    getAddressSuccess: (state, action) => {
      state.address = action.payload;
      state.loading = false;
    },
    deleteAddressSuccess: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id === action.payload
      );
      state.loading = false;
    },
    editAddressSuccess: (state, action) => {
      state.address = action.payload;
      state.loading = false;
    },
    setAsDefaultSuccess: (state, action) => {
      state.addresses = state.addresses.map((address, index) => {
        if (address.id === action.payload) {
          address.is_default = true;
        } else {
          address.is_default = false;
        }
        return address;
      });
      state.loading = false;
    },
    //used
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { addAddressSuccess, getAddressesSuccess, setLoading, hasError } =
  addressSlice.actions;

export default addressSlice.reducer;

export const fetchAddresses = async () => {
  dispatch(setLoading());
  const response = await axios.get(`/api/users/address/`);

  dispatch(addressSlice.actions.getAddressesSuccess(response.data));
};

export const addAddress = async (address: Address) => {
  // dispatch(setLoading());
  const response = await axios.post(`/api/users/address/`, address);
  dispatch(addressSlice.actions.addAddressSuccess(response.data));
};
export const setAsDefault = async (address_id: number | undefined) => {
  // dispatch(setLoading());
  const response = await axios.put(`/api/users/address/${address_id}`, {
    is_default: true,
  });
  dispatch(addressSlice.actions.setAsDefaultSuccess(address_id));
};
export const editAddress = async (
  address: Address,
  address_id: number | undefined
) => {
  // dispatch(setLoading());
  const response = await axios.put(`/api/users/address/${address_id}`, address);
  dispatch(addressSlice.actions.editAddressSuccess(response.data));
};
export const getAddress = async (address_id: number | string) => {
  dispatch(setLoading());
  const response = await axios.get(`/api/users/address/${address_id}`);
  console.log(response.data);
  dispatch(addressSlice.actions.getAddressSuccess(response.data));
};
export const deleteAddress = async (address_id: number | undefined) => {
  dispatch(setLoading());
  const response = await axios.delete(`/api/users/address/${address_id}`);
  console.log(response.data);
  dispatch(addressSlice.actions.deleteAddressSuccess(address_id));
};
