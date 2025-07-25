import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, finishLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
