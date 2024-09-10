import { createSlice } from "@reduxjs/toolkit";
import { Product, Category } from "@/types/product";
import { dispatch } from "@/redux/store";
import axios from "@/utils/axios";

const initCategories = [
  {
    id: 1,
    name: "New",
  },
  {
    id: 2,
    name: "Men",
  },
  {
    id: 3,
    name: "Women",
  },
  {
    id: 4,
    name: "Accessories",
  },
  {
    id: 5,
    name: "Art",
  },
  {
    id: 6,
    name: "Gadgets",
  },
  {
    id: 7,
    name: "Toys",
  },
  {
    id: 8,
    name: "Jewelry",
  },
  {
    id: 9,
    name: "Collectables",
  },
  {
    id: 10,
    name: "Vehicles",
  },
];

interface ProductState {
  error: object | string | null;
  products: Product[];
  categories: Category[];
  category_id: number | null;
  loading: boolean;
  page: number;
  search: string | null;
  hasNext: boolean;
}

const initialState: ProductState = {
  error: null,
  products: [],
  categories: initCategories,
  category_id: null,
  loading: false,
  page: 1,
  hasNext: true,
  search: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    //used
    addProductsSuccess: (state, action) => {
      state.products =
        state.page === 1
          ? action.payload.products
          : [...state.products, ...action.payload.products];
      state.loading = false;
      state.hasNext = action.payload.hasNext;
    },
    //used
    setLoading: (state) => {
      state.loading = true;
    },
    //used
    setCategory: (state, action) => {
      state.category_id = action.payload;
      state.page = 1;
      state.hasNext = true;
      state.search = null;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
      state.hasNext = true;
      state.category_id = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addLikeToProduct: (state, action) => {
      const { like, product_id } = action.payload;
      state.products = state.products.map((product, index) => {
        if (product.id === product_id) {
          // product.likes.push(like);
          product.likes = [like, ...product.likes];
        }
        return product;
      });
    },
    removeLikeFromProduct: (state, action) => {
      const { product_id, user_id } = action.payload;
      state.products = state.products.map((product, index) => {
        if (product.id === product_id) {
          product.likes = product.likes.filter(
            (like, index) => like.user.id != user_id
          );
        }
        return product;
      });
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  getCategoriesSuccess,
  addProductsSuccess,
  setLoading,
  setPage,
  setSearch,
  setCategory,
  addLikeToProduct,
  removeLikeFromProduct,
} = productSlice.actions;

export default productSlice.reducer;

type FetchProductsParams = {
  p: number;
  page_size: number;
  category_id?: number;
  search?: string;
  desc: boolean;
  is_active: boolean;
  is_published?: boolean;
  order_by?: string;
};

export const getCategories = async () => {
  try {
    dispatch(productSlice.actions.setLoading);
    const response = await axios.get("/api/categories/");
    dispatch(productSlice.actions.getCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(productSlice.actions.hasError(error));
  }
};
export const fetchProducts = async (
  page: number,
  category_id: number | null,
  search: string | null
) => {
  let params: FetchProductsParams = {
    p: page,
    page_size: 5,
    desc: true,
    is_active: true,
  };
  if (category_id) {
    if (category_id === 1) {
      params.is_published = true;
    } else {
      params.category_id = category_id;
    }
  }
  if (search) {
    params.search = search;
  }
  dispatch(setLoading());
  const response = await axios.get(`/api/products`, { params });
  const { results, next } = response.data;
  dispatch(
    productSlice.actions.addProductsSuccess({
      products: results,
      hasNext: !!next,
    })
  );
};

export const addLike = async (product_id: number) => {
  // dispatch(setLoading());
  const response = await axios.post(`/api/users/like/products/${product_id}`);
  const like = response.data;
  dispatch(productSlice.actions.addLikeToProduct({ product_id, like }));
};
export const removeLike = async (
  product_id: number,
  user_id: number | undefined
) => {
  // dispatch(setLoading());
  const response = await axios.delete(`/api/users/like/products/${product_id}`);
  dispatch(productSlice.actions.removeLikeFromProduct({ product_id, user_id }));
};

export const getProduct = async (product_id: number) => {
  const response = await axios.get(`/api/products/${product_id}`);
  return response.data;
};
