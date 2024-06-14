import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyListLoading: false,
  companyListSuccess: false,
  companyListFailed: false,
  companyListData: [],

  postCompanyLoading: false,
  postCompanySuccess: false,
  postCompanyFailed: false,
  postCompanyData: [],

  putCompanyLoading: false,
  putCompanySuccess: false,
  putCompanyFailed: false,
  putCompanyData: [],

  delCompanyLoading: false,
  delCompanySuccess: false,
  delCompanyFailed: false,
  delCompanyData: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetData: (state) => {
      state.companyListLoading = false;
      state.companyListSuccess = false;
      state.companyListFailed = false;
      state.companyListData = [];
      state.postCompanyLoading = false;
      state.postCompanySuccess = false;
      state.postCompanyFailed = false;
      state.postCompanyData = [];
      state.putCompanyLoading = false;
      state.putCompanySuccess = false;
      state.putCompanyFailed = false;
      state.putCompanyData = [];
      state.delCompanyLoading = false;
      state.delCompanySuccess = false;
      state.delCompanyFailed = false;
      state.delCompanyData = [];
    },
    getData: (state) => {
      state.companyListLoading = true;
      state.companyListSuccess = false;
      state.companyListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.companyListLoading = false;
      state.companyListSuccess = true;
      state.companyListData = action.payload;
    },
    getDataFailed: (state) => {
      state.companyListLoading = false;
      state.companyListSuccess = false;
      state.companyListFailed = true;
    },

    postData: (state) => {
      state.postCompanyLoading = true;
      state.postCompanySuccess = false;
      state.postCompanyFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postCompanyLoading = false;
      state.postCompanySuccess = true;
      state.postCompanyData = action.payload;
    },
    postDataFailed: (state) => {
      state.postCompanyLoading = false;
      state.postCompanySuccess = false;
      state.postCompanyFailed = true;
    },

    putData: (state) => {
      state.putCompanyLoading = true;
      state.putCompanySuccess = false;
      state.putCompanyFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putCompanyLoading = false;
      state.putCompanySuccess = true;
      state.putCompanyData = action.payload;
    },
    putDataFailed: (state) => {
      state.putCompanyLoading = false;
      state.putCompanySuccess = false;
      state.putCompanyFailed = true;
    },

    delData: (state) => {
      state.delCompanyLoading = true;
      state.delCompanySuccess = false;
      state.delCompanyFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delCompanyLoading = false;
      state.delCompanySuccess = true;
      state.delCompanyData = action.payload;
    },
    delDataFailed: (state) => {
      state.delCompanyLoading = false;
      state.delCompanySuccess = false;
      state.delCompanyFailed = true;
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
} = companySlice.actions;

export default companySlice.reducer;
