import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeListLoading: false,
  employeeListSuccess: false,
  employeeListFailed: false,
  employeeListData: [],

  laboratoryListLoading: false,
  laboratoryListSuccess: false,
  laboratoryListFailed: false,
  laboratoryListData: [],

  postlaboratoryPicLoading: false,
  postlaboratoryPicSuccess: false,
  postlaboratoryPicFailed: false,
  postlaboratoryPicData: [],
};

export const laboratorySlice = createSlice({
  name: "laboratory",
  initialState,
  reducers: {
    resetData: (state) => {
      state.employeeListLoading = false;
      state.employeeListSuccess = false;
      state.employeeListFailed = false;
      state.employeeListData = [];
      state.postlaboratoryPicLoading = false;
      state.postlaboratoryPicSuccess = false;
      state.postlaboratoryPicFailed = false;
      state.postlaboratoryPicData = [];
      state.laboratoryListLoading = false;
      state.laboratoryListSuccess = false;
      state.laboratoryListFailed = false;
      state.laboratoryListData = [];
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
    postlaboratoryPicData: (state) => {
      state.postlaboratoryPicLoading = true;
      state.postlaboratoryPicSuccess = false;
      state.postlaboratoryPicFailed = false;
    },
    postlaboratoryPicDataFulfilled: (state, action) => {
      state.postlaboratoryPicLoading = false;
      state.postlaboratoryPicSuccess = true;
      state.postlaboratoryPicData = action.payload;
    },
    postlaboratoryPicFailed: (state) => {
      state.postlaboratoryPicLoading = false;
      state.postlaboratoryPicSuccess = false;
      state.postlaboratoryPicFailed = true;
    },
    getlaboratoryData: (state) => {
      state.laboratoryListLoading = true;
      state.laboratoryListSuccess = false;
      state.laboratoryListFailed = false;
    },
    getlaboratoryDataFulfilled: (state, action) => {
      state.laboratoryListLoading = false;
      state.laboratoryListSuccess = true;
      state.laboratoryListData = action.payload;
    },
    getlaboratoryDataFailed: (state) => {
      state.laboratoryListLoading = false;
      state.laboratoryListSuccess = false;
      state.laboratoryListFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  getlaboratoryData,
  getlaboratoryDataFulfilled,
  getlaboratoryDataFailed,
  postlaboratoryPicData,
  postlaboratoryPicDataFulfilled,
  postlaboratoryPicFailed,
  resetData,
} = laboratorySlice.actions;

export default laboratorySlice.reducer;
