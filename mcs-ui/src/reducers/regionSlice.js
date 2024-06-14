import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regionListLoading: false,
  regionListSuccess: false,
  regionListFailed: false,
  regionListData: [],

  regionFilteredListLoading: false,
  regionFilteredListSuccess: false,
  regionFilteredListFailed: false,
  regionFilteredListData: [],

  regionNameLoading: false,
  regionNameSuccess: false,
  regionNameFailed: false,
  regionNameData: [],

  postRegionLoading: false,
  postRegionSuccess: false,
  postRegionFailed: false,
  postRegionData: [],

  putRegionLoading: false,
  putRegionSuccess: false,
  putRegionFailed: false,
  putRegionData: [],

  delRegionLoading: false,
  delRegionSuccess: false,
  delRegionFailed: false,
  delRegionData: [],
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    resetData: (state) => {
      state.regionListLoading = false;
      state.regionListSuccess = false;
      state.regionListFailed = false;
      state.regionListData = [];
      state.regionFilteredListLoading = false;
      state.regionFilteredListSuccess = false;
      state.regionFilteredListFailed = false;
      state.regionFilteredListData = [];
      state.regionNameLoading = false;
      state.regionNameSuccess = false;
      state.regionNameFailed = false;
      state.regionNameData = [];
      state.postRegionLoading = false;
      state.postRegionSuccess = false;
      state.postRegionFailed = false;
      state.postRegionData = [];
      state.putRegionLoading = false;
      state.putRegionSuccess = false;
      state.putRegionFailed = false;
      state.putRegionData = [];
      state.delRegionLoading = false;
      state.delRegionSuccess = false;
      state.delRegionFailed = false;
      state.delRegionData = [];
    },
    getData: (state) => {
      state.regionListLoading = true;
      state.regionListSuccess = false;
      state.regionListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.regionListLoading = false;
      state.regionListSuccess = true;
      state.regionListData = action.payload;
    },
    getDataFailed: (state) => {
      state.regionListLoading = false;
      state.regionListSuccess = false;
      state.regionListFailed = true;
    },

    getFilteredData: (state) => {
      state.regionFilteredListLoading = true;
      state.regionFilteredListSuccess = false;
      state.regionFilteredListFailed = false;
    },
    getFilteredDataFulfilled: (state, action) => {
      state.regionFilteredListLoading = false;
      state.regionFilteredListSuccess = true;
      state.regionFilteredListData = action.payload;
    },
    getFilteredDataFailed: (state) => {
      state.regionFilteredListLoading = false;
      state.regionFilteredListSuccess = false;
      state.regionFilteredListFailed = true;
    },

    getDuplicateData: (state) => {
      state.regionNameLoading = true;
      state.regionNameSuccess = false;
      state.regionNameFailed = false;
    },
    getDuplicateDataFulfilled: (state, action) => {
      state.regionNameLoading = false;
      state.regionNameSuccess = true;
      state.regionNameData = action.payload;
    },
    getDuplicateDataFailed: (state) => {
      state.regionNameLoading = false;
      state.regionNameSuccess = false;
      state.regionNameFailed = true;
    },

    postData: (state) => {
      state.postRegionLoading = true;
      state.postRegionSuccess = false;
      state.postRegionFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postRegionLoading = false;
      state.postRegionSuccess = true;
      state.postRegionData = action.payload;
    },
    postDataFailed: (state) => {
      state.postRegionLoading = false;
      state.postRegionSuccess = false;
      state.postRegionFailed = true;
    },

    putData: (state) => {
      state.putRegionLoading = true;
      state.putRegionSuccess = false;
      state.putRegionFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putRegionLoading = false;
      state.putRegionSuccess = true;
      state.putRegionData = action.payload;
    },
    putDataFailed: (state) => {
      state.putRegionLoading = false;
      state.putRegionSuccess = false;
      state.putRegionFailed = true;
    },

    delData: (state) => {
      state.delRegionLoading = true;
      state.delRegionSuccess = false;
      state.delRegionFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delRegionLoading = false;
      state.delRegionSuccess = true;
      state.delRegionData = action.payload;
    },
    delDataFailed: (state) => {
      state.delRegionLoading = false;
      state.delRegionSuccess = false;
      state.delRegionFailed = true;
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
} = regionSlice.actions;

export default regionSlice.reducer;
