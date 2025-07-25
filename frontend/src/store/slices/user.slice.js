import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import BACKEND_HOST from "../../api/index";
import {
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
        toast.error(`Error : ${err?.message}`);
      })
      .finally(() => dispatch(finishLoading()));
  } catch (error) {
    console.log(error);
    toast.error(`Error : ${error?.message}`);
  }
};

export const loginUser = (userData, navigate) => (dispatch) => {
  try {
    console.log("Called");
    BACKEND_HOST.post(LOGIN_ROUTE, userData, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data));
        navigate("/");
        toast.success("Logged in successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error : ${err?.message}`);
      })
      .finally(() => dispatch(finishLoading()));
  } catch (error) {
    console.log(error);
    toast.error(`Error : ${error?.message}`);
  }
};

export const registerUser = (userData, navigate) => (dispatch) => {
  try {
    BACKEND_HOST.post(REGISTER_ROUTE, userData)
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data));
        navigate("/");
        toast.success("User registered successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error : ${err?.message}`);
      })
      .finally(() => dispatch(finishLoading()));
  } catch (error) {
    console.log(error);
    toast.error(`Error : ${error?.message}`);
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
    toast.error(`Error: ${error?.message}`);
    dispatch(finishLoading());
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (_, { payload: p }) => p,
    logout: () => {},
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
