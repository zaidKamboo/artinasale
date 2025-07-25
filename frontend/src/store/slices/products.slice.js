import { createSlice } from "@reduxjs/toolkit";
import {
  CREATE_PRODUCT_ROUTE,
  GET_USER_PRODUCTS_ROUTE,
  PRODUCT_ROUTES,
} from "../../utils";
import BACKEND_HOST from "../../api";
import { toast } from "react-toastify";
import { finishLoading } from "./loader.slice";

const initialState = [];

const loaderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (_, { payload: p }) => p,
    resetProducts: () => initialState,
  },
});

export const { setProducts, resetProducts } = loaderSlice.actions;

export const getProducts = () => (dispatch) => {
  try {
    BACKEND_HOST.get(PRODUCT_ROUTES, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setProducts(res.data));
        toast.success("Products fetched successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error : ${err.response?.data?.message}`);
      })
      .finally(() => dispatch(finishLoading()));
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    toast.error(errorMessage);
  }
};
export const getUserProducts = (id) => (dispatch) => {
  try {
    BACKEND_HOST.get(`${GET_USER_PRODUCTS_ROUTE}/${id}`, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        dispatch(setProducts(res.data));
        toast.success("User Products fetched successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error : ${err.response?.data?.message}`);
      })
      .finally(() => dispatch(finishLoading()));
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    toast.error(errorMessage);
  }
};

export default loaderSlice.reducer;
