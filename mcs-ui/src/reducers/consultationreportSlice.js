import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultationreportListLoading: false,
  consultationreportListSuccess: false,
  consultationreportListFailed: false,
  consultationreportListData: [],

  consultationreportIllnessLoading: false,
  consultationreportIllnessSuccess: false,
  consultationreportIllnessFailed: false,
  consultationreportIllnessData: [],

  consultationdepartmentIllnessLoading: false,
  consultationdepartmentIllnessSuccess: false,
  consultationdepartmentIllnessFailed: false,
  consultationdepartmentIllnessData: [],
};

export const consultationreportSlice = createSlice({
  name: "consultationreport",
  initialState,
  reducers: {
    resetData: (state) => {
      state.consultationreportListLoading = false;
      state.consultationreportListSuccess = false;
      state.consultationreportListFailed = false;
      state.consultationreportListData = [];

      state.consultationreportIllnessLoading = false;
      state.consultationreportIllnessSuccess = false;
      state.consultationreportIllnessFailed = false;
      state.consultationreportIllnessData = [];

      state.consultationdepartmentIllnessLoading = false;
      state.consultationdepartmentIllnessSuccess = false;
      state.consultationdepartmentIllnessFailed = false;
      state.consultationdepartmentIllnessData = [];
    },
    getData: (state) => {
      state.consultationreportListLoading = true;
      state.consultationreportListSuccess = false;
      state.consultationreportListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.consultationreportListLoading = false;
      state.consultationreportListSuccess = true;
      state.consultationreportListData = action.payload;
    },
    getDataFailed: (state) => {
      state.consultationreportListLoading = false;
      state.consultationreportListSuccess = false;
      state.consultationreportListFailed = true;
    },

    getIllnessData: (state) => {
      state.consultationreportIllnessLoading = true;
      state.consultationreportIllnessSuccess = false;
      state.consultationreportIllnessFailed = false;
    },
    getIllnessDataFulfilled: (state, action) => {
      state.consultationreportIllnessLoading = false;
      state.consultationreportIllnessSuccess = true;
      state.consultationreportIllnessData = action.payload;
    },
    getIllnessDataFailed: (state) => {
      state.consultationreportIllnessLoading = false;
      state.consultationreportIllnessSuccess = false;
      state.consultationreportIllnessFailed = true;
    },

    getDepartmentData: (state) => {
      state.consultationdepartmentIllnessLoading = true;
      state.consultationdepartmentIllnessSuccess = false;
      state.consultationdepartmentIllnessFailed = false;
    },
    getDepartmentDataFulfilled: (state, action) => {
      state.consultationdepartmentIllnessLoading = false;
      state.consultationdepartmentIllnessSuccess = true;
      state.consultationdepartmentIllnessData = action.payload;
    },
    getDepartmentDataFailed: (state) => {
      state.consultationdepartmentIllnessLoading = false;
      state.consultationdepartmentIllnessSuccess = false;
      state.consultationdepartmentIllnessFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  getIllnessData,
  getIllnessDataFulfilled,
  getIllnessDataFailed,
  getDepartmentData,
  getDepartmentDataFulfilled,
  getDepartmentDataFailed,
  resetData,
} = consultationreportSlice.actions;

export default consultationreportSlice.reducer;
