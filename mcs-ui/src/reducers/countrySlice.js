import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryListLoading: false,
  countryListSuccess: false,
  countryListFailed: false,
  countryListData: [],

  countryNameLoading: false,
  countryNameSuccess: false,
  countryNameFailed: false,
  countryNameData: [],

  postCountryLoading: false,
  postCountrySuccess: false,
  postCountryFailed: false,
  postCountryData: [],

  putCountryLoading: false,
  putCountrySuccess: false,
  putCountryFailed: false,
  putCountryData: [],

  delCountryLoading: false,
  delCountrySuccess: false,
  delCountryFailed: false,
  delCountryData: [],
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    resetData: (state) => {
      state.countryListLoading = false;
      state.countryListSuccess = false;
      state.countryListFailed = false;
      state.countryListData = [];
      state.countryNameLoading = false;
      state.countryNameSuccess = false;
      state.countryNameFailed = false;
      state.countryNameData = [];
      state.postCountryLoading = false;
      state.postCountrySuccess = false;
      state.postCountryFailed = false;
      state.postCountryData = [];
      state.putCountryLoading = false;
      state.putCountrySuccess = false;
      state.putCountryFailed = false;
      state.putCountryData = [];
      state.delCountryLoading = false;
      state.delCountrySuccess = false;
      state.delCountryFailed = false;
      state.delCountryData = [];
    },
    getData: (state) => {
      state.countryListLoading = true;
      state.countryListSuccess = false;
      state.countryListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.countryListLoading = false;
      state.countryListSuccess = true;
      state.countryListData = action.payload;
    },
    getDataFailed: (state) => {
      state.countryListLoading = false;
      state.countryListSuccess = false;
      state.countryListFailed = true;
    },

    getDuplicateData: (state) => {
      state.countryNameLoading = true;
      state.countryNameSuccess = false;
      state.countryNameFailed = false;
    },
    getDuplicateDataFulfilled: (state, action) => {
      state.countryNameLoading = false;
      state.countryNameSuccess = true;
      state.countryNameData = action.payload;
    },
    getDuplicateDataFailed: (state) => {
      state.countryNameLoading = false;
      state.countryNameSuccess = false;
      state.countryNameFailed = true;
    },

    postData: (state) => {
      state.postCountryLoading = true;
      state.postCountrySuccess = false;
      state.postCountryFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postCountryLoading = false;
      state.postCountrySuccess = true;
      state.postCountryData = action.payload;
    },
    postDataFailed: (state) => {
      state.postCountryLoading = false;
      state.postCountrySuccess = false;
      state.postCountryFailed = true;
    },

    putData: (state) => {
      state.putCountryLoading = true;
      state.putCountrySuccess = false;
      state.putCountryFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putCountryLoading = false;
      state.putCountrySuccess = true;
      state.putCountryData = action.payload;
    },
    putDataFailed: (state) => {
      state.putCountryLoading = false;
      state.putCountrySuccess = false;
      state.putCountryFailed = true;
    },

    delData: (state) => {
      state.delCountryLoading = true;
      state.delCountrySuccess = false;
      state.delCountryFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delCountryLoading = false;
      state.delCountrySuccess = true;
      state.delCountryData = action.payload;
    },
    delDataFailed: (state) => {
      state.delCountryLoading = false;
      state.delCountrySuccess = false;
      state.delCountryFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
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
} = countrySlice.actions;

export default countrySlice.reducer;
