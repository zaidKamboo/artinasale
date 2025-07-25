import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import BACKEND_HOST from "../../api/index";
import {
  CONTACT_ROUTES,
  GET_PROFILE_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTER_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "../../utils";
import { finishLoading } from "./loader.slice";

// AUTH ACTIONS
export const logoutUser = (navigate) => (dispatch) => {
  try {
    console.log("Called");
    BACKEND_HOST.get(LOGOUT_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(logout());
        navigate("/");
        toast.success("Logged out successfully.");
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

export const loginUser = (userData, navigate) => (dispatch) => {
  try {
    BACKEND_HOST.post(LOGIN_ROUTE, userData, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data));
        navigate("/");
        toast.success("Logged in successfully.");
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

export const registerUser = (userData, navigate) => (dispatch) => {
  try {
    BACKEND_HOST.post(REGISTER_ROUTE, userData, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data));
        navigate("/");
        toast.success("User registered successfully.");
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

// PROFILE ACTIONS
export const updateUserProfile = (userData, navigate) => (dispatch) => {
  try {
    BACKEND_HOST.put(UPDATE_PROFILE_ROUTE, userData, { withCredentials: true })
      .then((res) => {
        dispatch(setUser(res.data));
        navigate("/profile");
        toast.success("Profile updated successfully.");
      })
      .catch((err) =>
        toast.error(`Error: ${err?.response?.data?.message || err.message}`)
      )
      .finally(() => dispatch(finishLoading()));
  } catch (error) {
    toast.error(`Error: ${error.response?.data?.message}`);
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    toast.error(errorMessage);
  }
};

export const getUserProfile = () => (dispatch) => {
  try {
    BACKEND_HOST.get(GET_PROFILE_ROUTE, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data));
        // toast.success("Fetched profile successfully.");
      })
      .catch((err) => {
        console.log(err);
        // toast.error(`Error : ${err.response?.data?.message}`);
      })
      .finally(() => dispatch(finishLoading()));
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    // toast.error(errorMessage);
  }
};

// CONTACT US
export const contact = (data, navigate) => (dispatch) => {
  try {
    BACKEND_HOST.post(CONTACT_ROUTES, data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/");
        toast.success(res?.data?.message);
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
const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (_, { payload: p }) => p,
    logout: () => {
      return {};
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
