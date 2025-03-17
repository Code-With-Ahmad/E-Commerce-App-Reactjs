import api from "./api"; 

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../redux/slices/productsSlice";

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await api.get("/products");
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await api.get(`/products/${id}`);
    dispatch(fetchProductsSuccess([response.data]));
    return response.data;
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
    throw error;
  }
};
