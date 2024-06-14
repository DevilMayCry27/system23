import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityListLoading: false,
  cityListSuccess: false,
  cityListFailed: false,
  cityListData: [],

  cityFilteredListLoading: false,
  cityFilteredListSuccess: false,
  cityFilteredListFailed: false,
  cityFilteredListData: [],

  cityNameLoading: false,
  cityNameSuccess: false,
  cityNameFailed: false,
  cityNameData: [],

  postCityLoading: false,
  postCitySuccess: false,
  postCityFailed: false,
  postCityData: [],

  putCityLoading: false,
  putCitySuccess: false,
  putCityFailed: false,
  putCityData: [],

  delCityLoading: false,
  delCitySuccess: false,
  delCityFailed: false,
  delCityData: [],
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    resetData: (state) => {
      state.cityListLoading = false;
      state.cityListSuccess = false;
      state.cityListFailed = false;
      state.cityListData = [];
      state.cityFilteredListLoading = false;
      state.cityFilteredListSuccess = false;
      state.cityFilteredListFailed = false;
      state.cityFilteredListData = [];
      state.cityNameLoading = false;
      state.cityNameSuccess = false;
      state.cityNameFailed = false;
      state.cityNameData = [];
      state.postCityLoading = false;
      state.postCitySuccess = false;
      state.postCityFailed = false;
      state.postCityData = [];
      state.putCityLoading = false;
      state.putCitySuccess = false;
      state.putCityFailed = false;
      state.putCityData = [];
      state.delCityLoading = false;
      state.delCitySuccess = false;
      state.delCityFailed = false;
      state.delCityData = [];
    },
    getData: (state) => {
      state.cityListLoading = true;
      state.cityListSuccess = false;
      state.cityListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.cityListLoading = false;
      state.cityListSuccess = true;
      state.cityListData = action.payload;
    },
    getDataFailed: (state) => {
      state.cityListLoading = false;
      state.cityListSuccess = false;
      state.cityListFailed = true;
    },

    getFilteredData: (state) => {
      state.cityFilteredListLoading = true;
      state.cityFilteredListSuccess = false;
      state.cityFilteredListFailed = false;
    },
    getFilteredDataFulfilled: (state, action) => {
      state.cityFilteredListLoading = false;
      state.cityFilteredListSuccess = true;
      state.cityFilteredListData = action.payload;
    },
    getFilteredDataFailed: (state) => {
      state.cityFilteredListLoading = false;
      state.cityFilteredListSuccess = false;
      state.cityFilteredListFailed = true;
    },

    getDuplicateData: (state) => {
      state.cityNameLoading = true;
      state.cityNameSuccess = false;
      state.cityNameFailed = false;
    },
    getDuplicateDataFulfilled: (state, action) => {
      state.cityNameLoading = false;
      state.cityNameSuccess = true;
      state.cityNameData = action.payload;
    },
    getDuplicateDataFailed: (state) => {
      state.cityNameLoading = false;
      state.cityNameSuccess = false;
      state.cityNameFailed = true;
    },

    postData: (state) => {
      state.postCityLoading = true;
      state.postCitySuccess = false;
      state.postCityFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postCityLoading = false;
      state.postCitySuccess = true;
      state.postCityData = action.payload;
    },
    postDataFailed: (state) => {
      state.postCityLoading = false;
      state.postCitySuccess = false;
      state.postCityFailed = true;
    },

    putData: (state) => {
      state.putCityLoading = true;
      state.putCitySuccess = false;
      state.putCityFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putCityLoading = false;
      state.putCitySuccess = true;
      state.putCityData = action.payload;
    },
    putDataFailed: (state) => {
      state.putCityLoading = false;
      state.putCitySuccess = false;
      state.putCityFailed = true;
    },

    delData: (state) => {
      state.delCityLoading = true;
      state.delCitySuccess = false;
      state.delCityFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delCityLoading = false;
      state.delCitySuccess = true;
      state.delCityData = action.payload;
    },
    delDataFailed: (state) => {
      state.delCityLoading = false;
      state.delCitySuccess = false;
      state.delCityFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  getFilteredData,
  getFilteredDataFulfilled,
  getFilteredDataFailed,
  getDuplicateData,
  getDuplicateDataFulfilled,
  getDuplicateDataFailed,
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
} = citySlice.actions;

export default citySlice.reducer;
