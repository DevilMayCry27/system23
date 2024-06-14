import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessListLoading: false,
  accessListSuccess: false,
  accessListFailed: false,
  accessListData: [],

  authAccessLoading: false,
  authAccessSuccess: false,
  authAccessFailed: false,
  authAccessData: [],

  putAccessLoading: false,
  putAccessSuccess: false,
  putAccessFailed: false,
  putAccessData: [],
};

export const accessSlice = createSlice({
  name: "access",
  initialState,
  reducers: {
    resetData: (state) => {
      state.accessListLoading = false;
      state.accessListSuccess = false;
      state.accessListFailed = false;
      state.accessListData = [];
      state.authAccessLoading = false;
      state.authAccessSuccess = false;
      state.authAccessFailed = false;
      state.authAccessData = [];
      state.putAccessLoading = false;
      state.putAccessSuccess = false;
      state.putAccessFailed = false;
      state.putAccessData = [];
    },
    getData: (state) => {
      state.accessListLoading = true;
      state.accessListSuccess = false;
      state.accessListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.accessListLoading = false;
      state.accessListSuccess = true;
      state.accessListData = action.payload;
    },
    getDataFailed: (state) => {
      state.accessListLoading = false;
      state.accessListSuccess = false;
      state.accessListFailed = true;
    },

    getAuthAccess: (state) => {
      state.authAccessLoading = true;
      state.authAccessSuccess = false;
      state.authAccessFailed = false;
    },
    getAuthAccessFulfilled: (state, action) => {
      state.authAccessLoading = false;
      state.authAccessSuccess = true;
      state.authAccessData = action.payload;
    },
    getAuthAccessFailed: (state) => {
      state.authAccessLoading = false;
      state.authAccessSuccess = false;
      state.authAccessFailed = true;
    },

    putData: (state) => {
      state.putAccessLoading = true;
      state.putAccessSuccess = false;
      state.putAccessFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putAccessLoading = false;
      state.putAccessSuccess = true;
      state.putAccessData = action.payload;
    },
    putDataFailed: (state) => {
      state.putAccessLoading = false;
      state.putAccessSuccess = false;
      state.putAccessFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  putData,
  putDataFulfilled,
  putDataFailed,
  getAuthAccess,
  getAuthAccessFulfilled,
  getAuthAccessFailed,
  resetData,
} = accessSlice.actions;

export default accessSlice.reducer;
