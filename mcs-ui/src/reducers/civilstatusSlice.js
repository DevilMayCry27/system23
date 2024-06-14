import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  civilstatusListLoading: false,
  civilstatusListSuccess: false,
  civilstatusListFailed: false,
  civilstatusListData: [],

  postCivilstatusLoading: false,
  postCivilstatusSuccess: false,
  postCivilstatusFailed: false,
  postCivilstatusData: [],

  putCivilstatusLoading: false,
  putCivilstatusSuccess: false,
  putCivilstatusFailed: false,
  putCivilstatusData: [],

  delCivilstatusLoading: false,
  delCivilstatusSuccess: false,
  delCivilstatusFailed: false,
  delCivilstatusData: [],
};

export const civilstatusSlice = createSlice({
  name: "civilstatus",
  initialState,
  reducers: {
    resetData: (state) => {
      state.civilstatusListLoading = false;
      state.civilstatusListSuccess = false;
      state.civilstatusListFailed = false;
      state.civilstatusListData = [];
      state.postCivilstatusLoading = false;
      state.postCivilstatusSuccess = false;
      state.postCivilstatusFailed = false;
      state.postCivilstatusData = [];
      state.putCivilstatusLoading = false;
      state.putCivilstatusSuccess = false;
      state.putCivilstatusFailed = false;
      state.putCivilstatusData = [];
      state.delCivilstatusLoading = false;
      state.delCivilstatusSuccess = false;
      state.delCivilstatusFailed = false;
      state.delCivilstatusData = [];
    },
    getData: (state) => {
      state.civilstatusListLoading = true;
      state.civilstatusListSuccess = false;
      state.civilstatusListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.civilstatusListLoading = false;
      state.civilstatusListSuccess = true;
      state.civilstatusListData = action.payload;
    },
    getDataFailed: (state) => {
      state.civilstatusListLoading = false;
      state.civilstatusListSuccess = false;
      state.civilstatusListFailed = true;
    },

    postData: (state) => {
      state.postCivilstatusLoading = true;
      state.postCivilstatusSuccess = false;
      state.postCivilstatusFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postCivilstatusLoading = false;
      state.postCivilstatusSuccess = true;
      state.postCivilstatusData = action.payload;
    },
    postDataFailed: (state) => {
      state.postCivilstatusLoading = false;
      state.postCivilstatusSuccess = false;
      state.postCivilstatusFailed = true;
    },

    putData: (state) => {
      state.putCivilstatusLoading = true;
      state.putCivilstatusSuccess = false;
      state.putCivilstatusFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putCivilstatusLoading = false;
      state.putCivilstatusSuccess = true;
      state.putCivilstatusData = action.payload;
    },
    putDataFailed: (state) => {
      state.putCivilstatusLoading = false;
      state.putCivilstatusSuccess = false;
      state.putCivilstatusFailed = true;
    },

    delData: (state) => {
      state.delCivilstatusLoading = true;
      state.delCivilstatusSuccess = false;
      state.delCivilstatusFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delCivilstatusLoading = false;
      state.delCivilstatusSuccess = true;
      state.delCivilstatusData = action.payload;
    },
    delDataFailed: (state) => {
      state.delCivilstatusLoading = false;
      state.delCivilstatusSuccess = false;
      state.delCivilstatusFailed = true;
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
} = civilstatusSlice.actions;

export default civilstatusSlice.reducer;
