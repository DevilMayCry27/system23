import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salesorderListLoading: false,
  salesorderListSuccess: false,
  salesorderListFailed: false,
  salesorderListData: [],

  postSalesorderLoading: false,
  postSalesorderSuccess: false,
  postSalesorderFailed: false,
  postSalesorderData: [],

  putSalesorderLoading: false,
  putSalesorderSuccess: false,
  putSalesorderFailed: false,
  putSalesorderData: [],

  delSalesorderLoading: false,
  delSalesorderSuccess: false,
  delSalesorderFailed: false,
  delSalesorderData: [],
};

export const salesorderSlice = createSlice({
  name: "salesorder",
  initialState,
  reducers: {
    resetData: (state) => {
      state.salesorderListLoading = false;
      state.salesorderListSuccess = false;
      state.salesorderListFailed = false;
      state.salesorderListData = [];
      state.postSalesorderLoading = false;
      state.postSalesorderSuccess = false;
      state.postSalesorderFailed = false;
      state.postSalesorderData = [];
      state.putSalesorderLoading = false;
      state.putSalesorderSuccess = false;
      state.putSalesorderFailed = false;
      state.putSalesorderData = [];
      state.delSalesorderLoading = false;
      state.delSalesorderSuccess = false;
      state.delSalesorderFailed = false;
      state.delSalesorderData = [];
    },
    getData: (state) => {
      state.salesorderListLoading = true;
      state.salesorderListSuccess = false;
      state.salesorderListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.salesorderListLoading = false;
      state.salesorderListSuccess = true;
      state.salesorderListData = action.payload;
    },
    getDataFailed: (state) => {
      state.salesorderListLoading = false;
      state.salesorderListSuccess = false;
      state.salesorderListFailed = true;
    },

    postData: (state) => {
      state.postSalesorderLoading = true;
      state.postSalesorderSuccess = false;
      state.postSalesorderFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postSalesorderLoading = false;
      state.postSalesorderSuccess = true;
      state.postSalesorderData = action.payload;
    },
    postDataFailed: (state) => {
      state.postSalesorderLoading = false;
      state.postSalesorderSuccess = false;
      state.postSalesorderFailed = true;
    },

    putData: (state) => {
      state.putSalesorderLoading = true;
      state.putSalesorderSuccess = false;
      state.putSalesorderFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putSalesorderLoading = false;
      state.putSalesorderSuccess = true;
      state.putSalesorderData = action.payload;
    },
    putDataFailed: (state) => {
      state.putSalesorderLoading = false;
      state.putSalesorderSuccess = false;
      state.putSalesorderFailed = true;
    },

    delData: (state) => {
      state.delSalesorderLoading = true;
      state.delSalesorderSuccess = false;
      state.delSalesorderFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delSalesorderLoading = false;
      state.delSalesorderSuccess = true;
      state.delSalesorderData = action.payload;
    },
    delDataFailed: (state) => {
      state.delSalesorderLoading = false;
      state.delSalesorderSuccess = false;
      state.delSalesorderFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  postData,
  postDataFulfilled,
  postDataFailed,
  putData,
  putDataFulfilled,
  putDataFailed,
  delData,
  delDataFulfilled,
  delDataFailed,
  resetData,
} = salesorderSlice.actions;

export default salesorderSlice.reducer;
