import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionListLoading: false,
  sectionListSuccess: false,
  sectionListFailed: false,
  sectionListData: [],

  sectionFilteredListLoading: false,
  sectionFilteredListSuccess: false,
  sectionFilteredListFailed: false,
  sectionFilteredListData: [],

  postSectionLoading: false,
  postSectionSuccess: false,
  postSectionFailed: false,
  postSectionData: [],

  putSectionLoading: false,
  putSectionSuccess: false,
  putSectionFailed: false,
  putSectionData: [],

  delSectionLoading: false,
  delSectionSuccess: false,
  delSectionFailed: false,
  delSectionData: [],
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    resetData: (state) => {
      state.sectionListLoading = false;
      state.sectionListSuccess = false;
      state.sectionListFailed = false;
      state.sectionListData = [];
      state.sectionFilteredListLoading = false;
      state.sectionFilteredListSuccess = false;
      state.sectionFilteredListFailed = false;
      state.sectionFilteredListData = [];
      state.postSectionLoading = false;
      state.postSectionSuccess = false;
      state.postSectionFailed = false;
      state.postSectionData = [];
      state.putSectionLoading = false;
      state.putSectionSuccess = false;
      state.putSectionFailed = false;
      state.putSectionData = [];
      state.delSectionLoading = false;
      state.delSectionSuccess = false;
      state.delSectionFailed = false;
      state.delSectionData = [];
    },
    getData: (state) => {
      state.sectionListLoading = true;
      state.sectionListSuccess = false;
      state.sectionListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.sectionListLoading = false;
      state.sectionListSuccess = true;
      state.sectionListData = action.payload;
    },
    getDataFailed: (state) => {
      state.sectionListLoading = false;
      state.sectionListSuccess = false;
      state.sectionListFailed = true;
    },

    getFilteredData: (state) => {
      state.sectionFilteredListLoading = true;
      state.sectionFilteredListSuccess = false;
      state.sectionFilteredListFailed = false;
    },
    getFilteredDataFulfilled: (state, action) => {
      state.sectionFilteredListLoading = false;
      state.sectionFilteredListSuccess = true;
      state.sectionFilteredListData = action.payload;
    },
    getFilteredDataFailed: (state) => {
      state.sectionFilteredListLoading = false;
      state.sectionFilteredListSuccess = false;
      state.sectionFilteredListFailed = true;
    },

    postData: (state) => {
      state.postSectionLoading = true;
      state.postSectionSuccess = false;
      state.postSectionFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postSectionLoading = false;
      state.postSectionSuccess = true;
      state.postSectionData = action.payload;
    },
    postDataFailed: (state) => {
      state.postSectionLoading = false;
      state.postSectionSuccess = false;
      state.postSectionFailed = true;
    },

    putData: (state) => {
      state.putSectionLoading = true;
      state.putSectionSuccess = false;
      state.putSectionFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putSectionLoading = false;
      state.putSectionSuccess = true;
      state.putSectionData = action.payload;
    },
    putDataFailed: (state) => {
      state.putSectionLoading = false;
      state.putSectionSuccess = false;
      state.putSectionFailed = true;
    },

    delData: (state) => {
      state.delSectionLoading = true;
      state.delSectionSuccess = false;
      state.delSectionFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delSectionLoading = false;
      state.delSectionSuccess = true;
      state.delSectionData = action.payload;
    },
    delDataFailed: (state) => {
      state.delSectionLoading = false;
      state.delSectionSuccess = false;
      state.delSectionFailed = true;
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
} = sectionSlice.actions;

export default sectionSlice.reducer;
