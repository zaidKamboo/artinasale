import { createSlice } from "@reduxjs/toolkit";
import { CREATE_PRODUCT_ROUTE, PRODUCT_ROUTES } from "../../utils";
import BACKEND_HOST from "../../api";
import { toast } from "react-toastify";
import { finishLoading } from "./loader.slice";

const initialState = {};

const loaderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (_, { payload: p }) => p,
    resetProduct: () => initialState,
  },
});

export const { setProduct, resetProduct } = loaderSlice.actions;

export const createProduct = (data, navigate) => (dispatch) => {
  try {
    BACKEND_HOST.post(CREATE_PRODUCT_ROUTE, data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setProduct(res.data));
        navigate("/collection");
        toast.success("Product created successfully.");
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

export const getProduct = (id) => (dispatch) => {
  try {
    BACKEND_HOST.get(`${PRODUCT_ROUTES}/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setProduct(res.data));
        toast.success("Product fetched successfully.");
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
export const updateProduct = (id, productData, navigate) => (dispatch) => {
  try {
    console.log(id);
    BACKEND_HOST.put(`${PRODUCT_ROUTES}/${id}`, productData, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        dispatch(setProduct(res.data));
        toast.success("Product updated successfully.");
        navigate(`/product-details/${id}`);
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
