import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provinceListLoading: false,
  provinceListSuccess: false,
  provinceListFailed: false,
  provinceListData: [],

  provinceFilteredListLoading: false,
  provinceFilteredListSuccess: false,
  provinceFilteredListFailed: false,
  provinceFilteredListData: [],

  provinceNameLoading: false,
  provinceNameSuccess: false,
  provinceNameFailed: false,
  provinceNameData: [],

  postProvinceLoading: false,
  postProvinceSuccess: false,
  postProvinceFailed: false,
  postProvinceData: [],

  putProvinceLoading: false,
  putProvinceSuccess: false,
  putProvinceFailed: false,
  putProvinceData: [],

  delProvinceLoading: false,
  delProvinceSuccess: false,
  delProvinceFailed: false,
  delProvinceData: [],
};

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    resetData: (state) => {
      state.provinceListLoading = false;
      state.provinceListSuccess = false;
      state.provinceListFailed = false;
      state.provinceListData = [];
      state.provinceFilteredListLoading = false;
      state.provinceFilteredListSuccess = false;
      state.provinceFilteredListFailed = false;
      state.provinceFilteredListData = [];
      state.provinceNameLoading = false;
      state.provinceNameSuccess = false;
      state.provinceNameFailed = false;
      state.provinceNameData = [];
      state.postProvinceLoading = false;
      state.postProvinceSuccess = false;
      state.postProvinceFailed = false;
      state.postProvinceData = [];
      state.putProvinceLoading = false;
      state.putProvinceSuccess = false;
      state.putProvinceFailed = false;
      state.putProvinceData = [];
      state.delProvinceLoading = false;
      state.delProvinceSuccess = false;
      state.delProvinceFailed = false;
      state.delProvinceData = [];
    },
    getData: (state) => {
      state.provinceListLoading = true;
      state.provinceListSuccess = false;
      state.provinceListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.provinceListLoading = false;
      state.provinceListSuccess = true;
      state.provinceListData = action.payload;
    },
    getDataFailed: (state) => {
      state.provinceListLoading = false;
      state.provinceListSuccess = false;
      state.provinceListFailed = true;
    },

    getFilteredData: (state) => {
      state.provinceFilteredListLoading = true;
      state.provinceFilteredListSuccess = false;
      state.provinceFilteredListFailed = false;
    },
    getFilteredDataFulfilled: (state, action) => {
      state.provinceFilteredListLoading = false;
      state.provinceFilteredListSuccess = true;
      state.provinceFilteredListData = action.payload;
    },
    getFilteredDataFailed: (state) => {
      state.provinceFilteredListLoading = false;
      state.provinceFilteredListSuccess = false;
      state.provinceFilteredListFailed = true;
    },

    getDuplicateData: (state) => {
      state.provinceNameLoading = true;
      state.provinceNameSuccess = false;
      state.provinceNameFailed = false;
    },
    getDuplicateDataFulfilled: (state, action) => {
      state.provinceNameLoading = false;
      state.provinceNameSuccess = true;
      state.provinceNameData = action.payload;
    },
    getDuplicateDataFailed: (state) => {
      state.provinceNameLoading = false;
      state.provinceNameSuccess = false;
      state.provinceNameFailed = true;
    },

    postData: (state) => {
      state.postProvinceLoading = true;
      state.postProvinceSuccess = false;
      state.postProvinceFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postProvinceLoading = false;
      state.postProvinceSuccess = true;
      state.postProvinceData = action.payload;
    },
    postDataFailed: (state) => {
      state.postProvinceLoading = false;
      state.postProvinceSuccess = false;
      state.postProvinceFailed = true;
    },

    putData: (state) => {
      state.putProvinceLoading = true;
      state.putProvinceSuccess = false;
      state.putProvinceFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putProvinceLoading = false;
      state.putProvinceSuccess = true;
      state.putProvinceData = action.payload;
    },
    putDataFailed: (state) => {
      state.putProvinceLoading = false;
      state.putProvinceSuccess = false;
      state.putProvinceFailed = true;
    },

    delData: (state) => {
      state.delProvinceLoading = true;
      state.delProvinceSuccess = false;
      state.delProvinceFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delProvinceLoading = false;
      state.delProvinceSuccess = true;
      state.delProvinceData = action.payload;
    },
    delDataFailed: (state) => {
      state.delProvinceLoading = false;
      state.delProvinceSuccess = false;
      state.delProvinceFailed = true;
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
} = provinceSlice.actions;

export default provinceSlice.reducer;
