import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeListLoading: false,
  employeeListSuccess: false,
  employeeListFailed: false,
  employeeListData: [],

  apeListLoading: false,
  apeListSuccess: false,
  apeListFailed: false,
  apeListData: [],

  postApePicLoading: false,
  postApePicSuccess: false,
  postApePicFailed: false,
  postApePicData: [],
};

export const apeSlice = createSlice({
  name: "ape",
  initialState,
  reducers: {
    resetData: (state) => {
      state.employeeListLoading = false;
      state.employeeListSuccess = false;
      state.employeeListFailed = false;
      state.employeeListData = [];
      state.postApePicLoading = false;
      state.postApePicSuccess = false;
      state.postApePicFailed = false;
      state.postApePicData = [];
      state.apeListLoading = false;
      state.apeListSuccess = false;
      state.apeListFailed = false;
      state.apeListData = [];
    },
    getData: (state) => {
      state.employeeListLoading = true;
      state.employeeListSuccess = false;
      state.employeeListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.employeeListLoading = false;
      state.employeeListSuccess = true;
      state.employeeListData = action.payload;
    },
    getDataFailed: (state) => {
      state.employeeListLoading = false;
      state.employeeListSuccess = false;
      state.employeeListFailed = true;
    },
    postApePicData: (state) => {
      state.postApePicLoading = true;
      state.postApePicSuccess = false;
      state.postApePicFailed = false;
    },
    postApePicDataFulfilled: (state, action) => {
      state.postApePicLoading = false;
      state.postApePicSuccess = true;
      state.postApePicData = action.payload;
    },
    postApePicFailed: (state) => {
      state.postApePicLoading = false;
      state.postApePicSuccess = false;
      state.postApePicFailed = true;
    },
    getApeData: (state) => {
      state.apeListLoading = true;
      state.apeListSuccess = false;
      state.apeListFailed = false;
    },
    getApeDataFulfilled: (state, action) => {
      state.apeListLoading = false;
      state.apeListSuccess = true;
      state.apeListData = action.payload;
    },
    getApeDataFailed: (state) => {
      state.apeListLoading = false;
      state.apeListSuccess = false;
      state.apeListFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  getApeData,
  getApeDataFulfilled,
  getApeDataFailed,
  postApePicData,
  postApePicDataFulfilled,
  postApePicFailed,
  resetData,
} = apeSlice.actions;

export default apeSlice.reducer;
