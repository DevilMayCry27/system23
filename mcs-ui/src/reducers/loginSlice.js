import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginLoading: false,
  loginSuccess: false,
  loginFailed: false,
  loginData: [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetData: (state) => {
      state.loginLoading = false;
      state.loginSuccess = false;
      state.loginFailed = false;
      state.loginData = [];
    },
    getData: (state) => {
      state.loginLoading = true;
      state.loginSuccess = false;
      state.loginFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.loginLoading = false;
      state.loginSuccess = true;
      state.loginData = action.payload;
    },
    getDataFailed: (state) => {
      state.loginLoading = false;
      state.loginSuccess = false;
      state.loginFailed = true;
    },
  },
});

export const { getData, getDataFulfilled, getDataFailed, resetData } =
  loginSlice.actions;

export default loginSlice.reducer;
