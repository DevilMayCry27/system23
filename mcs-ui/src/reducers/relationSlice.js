import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  relationListLoading: false,
  relationListSuccess: false,
  relationListFailed: false,
  relationListData: [],

  postRelationLoading: false,
  postRelationSuccess: false,
  postRelationFailed: false,
  postRelationData: [],

  putRelationLoading: false,
  putRelationSuccess: false,
  putRelationFailed: false,
  putRelationData: [],

  delRelationLoading: false,
  delRelationSuccess: false,
  delRelationFailed: false,
  delRelationData: [],
};

export const relationSlice = createSlice({
  name: "relation",
  initialState,
  reducers: {
    resetData: (state) => {
      state.relationListLoading = false;
      state.relationListSuccess = false;
      state.relationListFailed = false;
      state.relationListData = [];
      state.postRelationLoading = false;
      state.postRelationSuccess = false;
      state.postRelationFailed = false;
      state.postRelationData = [];
      state.putRelationLoading = false;
      state.putRelationSuccess = false;
      state.putRelationFailed = false;
      state.putRelationData = [];
      state.delRelationLoading = false;
      state.delRelationSuccess = false;
      state.delRelationFailed = false;
      state.delRelationData = [];
    },
    getData: (state) => {
      state.relationListLoading = true;
      state.relationListSuccess = false;
      state.relationListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.relationListLoading = false;
      state.relationListSuccess = true;
      state.relationListData = action.payload;
    },
    getDataFailed: (state) => {
      state.relationListLoading = false;
      state.relationListSuccess = false;
      state.relationListFailed = true;
    },

    postData: (state) => {
      state.postRelationLoading = true;
      state.postRelationSuccess = false;
      state.postRelationFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postRelationLoading = false;
      state.postRelationSuccess = true;
      state.postRelationData = action.payload;
    },
    postDataFailed: (state) => {
      state.postRelationLoading = false;
      state.postRelationSuccess = false;
      state.postRelationFailed = true;
    },

    putData: (state) => {
      state.putRelationLoading = true;
      state.putRelationSuccess = false;
      state.putRelationFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putRelationLoading = false;
      state.putRelationSuccess = true;
      state.putRelationData = action.payload;
    },
    putDataFailed: (state) => {
      state.putRelationLoading = false;
      state.putRelationSuccess = false;
      state.putRelationFailed = true;
    },

    delData: (state) => {
      state.delRelationLoading = true;
      state.delRelationSuccess = false;
      state.delRelationFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delRelationLoading = false;
      state.delRelationSuccess = true;
      state.delRelationData = action.payload;
    },
    delDataFailed: (state) => {
      state.delRelationLoading = false;
      state.delRelationSuccess = false;
      state.delRelationFailed = true;
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
} = relationSlice.actions;

export default relationSlice.reducer;
