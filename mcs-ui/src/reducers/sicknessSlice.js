import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sicknessListLoading: false,
  sicknessListSuccess: false,
  sicknessListFailed: false,
  sicknessListData: [],

  postSicknessLoading: false,
  postSicknessSuccess: false,
  postSicknessFailed: false,
  postSicknessData: [],

  putSicknessLoading: false,
  putSicknessSuccess: false,
  putSicknessFailed: false,
  putSicknessData: [],

  delSicknessLoading: false,
  delSicknessSuccess: false,
  delSicknessFailed: false,
  delSicknessData: [],
};

export const sicknessSlice = createSlice({
  name: "sickness",
  initialState,
  reducers: {
    resetData: (state) => {
      state.sicknessListLoading = false;
      state.sicknessListSuccess = false;
      state.sicknessListFailed = false;
      state.sicknessListData = [];
      state.postSicknessLoading = false;
      state.postSicknessSuccess = false;
      state.postSicknessFailed = false;
      state.postSicknessData = [];
      state.putSicknessLoading = false;
      state.putSicknessSuccess = false;
      state.putSicknessFailed = false;
      state.putSicknessData = [];
      state.delSicknessLoading = false;
      state.delSicknessSuccess = false;
      state.delSicknessFailed = false;
      state.delSicknessData = [];
    },
    getData: (state) => {
      state.sicknessListLoading = true;
      state.sicknessListSuccess = false;
      state.sicknessListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.sicknessListLoading = false;
      state.sicknessListSuccess = true;
      state.sicknessListData = action.payload;
    },
    getDataFailed: (state) => {
      state.sicknessListLoading = false;
      state.sicknessListSuccess = false;
      state.sicknessListFailed = true;
    },

    postData: (state) => {
      state.postSicknessLoading = true;
      state.postSicknessSuccess = false;
      state.postSicknessFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postSicknessLoading = false;
      state.postSicknessSuccess = true;
      state.postSicknessData = action.payload;
    },
    postDataFailed: (state) => {
      state.postSicknessLoading = false;
      state.postSicknessSuccess = false;
      state.postSicknessFailed = true;
    },

    putData: (state) => {
      state.putSicknessLoading = true;
      state.putSicknessSuccess = false;
      state.putSicknessFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putSicknessLoading = false;
      state.putSicknessSuccess = true;
      state.putSicknessData = action.payload;
    },
    putDataFailed: (state) => {
      state.putSicknessLoading = false;
      state.putSicknessSuccess = false;
      state.putSicknessFailed = true;
    },

    delData: (state) => {
      state.delSicknessLoading = true;
      state.delSicknessSuccess = false;
      state.delSicknessFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delSicknessLoading = false;
      state.delSicknessSuccess = true;
      state.delSicknessData = action.payload;
    },
    delDataFailed: (state) => {
      state.delSicknessLoading = false;
      state.delSicknessSuccess = false;
      state.delSicknessFailed = true;
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
} = sicknessSlice.actions;

export default sicknessSlice.reducer;
