import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicinereleaseListLoading: false,
  medicinereleaseListSuccess: false,
  medicinereleaseListFailed: false,
  medicinereleaseListData: [],

  userlevelLoading: false,
  userlevelSuccess: false,
  userlevelFailed: false,
  userlevelData: [],

  medicineapprovalListLoading: false,
  medicineapprovalListSuccess: false,
  medicineapprovalListFailed: false,
  medicineapprovalListData: [],

  putApprovalLoading: false,
  putApprovalSuccess: false,
  putApprovalFailed: false,
  putApprovalData: [],

  putReleaseLoading: false,
  putReleaseSuccess: false,
  putReleaseFailed: false,
  putReleaseData: [],

  putRejectLoading: false,
  putRejectLoadingSuccess: false,
  putRejectFailed: false,
  putRejectData: [],
};

export const medicinereleaseSlice = createSlice({
  name: "medicinerelease",
  initialState,
  reducers: {
    resetData: (state) => {
      state.medicinereleaseListLoading = false;
      state.medicinereleaseListSuccess = false;
      state.medicinereleaseListFailed = false;
      state.medicinereleaseListData = [];

      state.userlevelLoading = false;
      state.userlevelSuccess = false;
      state.userlevelFailed = false;
      state.userlevelData = [];

      state.medicineapprovalListLoading = false;
      state.medicineapprovalListSuccess = false;
      state.medicineapprovalListFailed = false;
      state.medicineapprovalListData = [];

      state.putApprovalLoading = false;
      state.putApprovalSuccess = false;
      state.putApprovalFailed = false;
      state.putApprovalData = [];

      state.putReleaseLoading = false;
      state.putReleaseSuccess = false;
      state.putReleaseFailed = false;
      state.putReleaseData = [];

      state.putRejectLoading = false;
      state.putRejectSuccess = false;
      state.putRejectFailed = false;
      state.putRejectData = [];
    },

    getData: (state) => {
      state.medicinereleaseListLoading = true;
      state.medicinereleaseListSuccess = false;
      state.medicinereleaseListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.medicinereleaseListLoading = false;
      state.medicinereleaseListSuccess = true;
      state.medicinereleaseListData = action.payload;
    },
    getDataFailed: (state) => {
      state.medicinereleaseListLoading = false;
      state.medicinereleaseListSuccess = false;
      state.medicinereleaseListFailed = true;
    },

    getUserLevelData: (state) => {
      state.userlevelLoading = true;
      state.userlevelSuccess = false;
      state.userlevelFailed = false;
    },
    getUserLevelDataFulfilled: (state, action) => {
      state.userlevelLoading = false;
      state.userlevelSuccess = true;
      state.userlevelData = action.payload;
    },
    getUserLevelDataFailed: (state) => {
      state.userlevelLoading = false;
      state.userlevelSuccess = false;
      state.userlevelFailed = true;
    },

    getapproveData: (state) => {
      state.medicineapprovalListLoading = true;
      state.medicineapprovalListSuccess = false;
      state.medicineapprovalListFailed = false;
    },
    getapproveDataFulfilled: (state, action) => {
      state.medicineapprovalListLoading = false;
      state.medicineapprovalListSuccess = true;
      state.medicineapprovalListData = action.payload;
    },
    getapproveDataFailed: (state) => {
      state.medicineapprovalListLoading = false;
      state.medicineapprovalListSuccess = false;
      state.medicineapprovalListFailed = true;
    },

    putApprovalData: (state) => {
      state.putApprovalLoading = true;
      state.putApprovalSuccess = false;
      state.putApprovalFailed = false;
    },
    putApprovalDataFulfilled: (state, action) => {
      state.putApprovalLoading = false;
      state.putApprovalSuccess = true;
      state.putApprovalData = action.payload;
    },
    putApprovalDataFailed: (state) => {
      state.putApprovalLoading = false;
      state.putApprovalSuccess = false;
      state.putApprovalFailed = true;
    },

    putReleaseData: (state) => {
      state.putReleaseLoading = true;
      state.putReleaseSuccess = false;
      state.putReleaseFailed = false;
    },
    putReleaseDataFulfilled: (state, action) => {
      state.putReleaseLoading = false;
      state.putReleaseSuccess = true;
      state.putReleaseData = action.payload;
    },
    putReleaseDataFailed: (state) => {
      state.putReleaseLoading = false;
      state.putReleaseSuccess = false;
      state.putReleaseFailed = true;
    },

    putRejectData: (state) => {
      state.putRejectLoading = true;
      state.putRejectSuccess = false;
      state.putRejectFailed = false;
    },
    putRejectDataFulfilled: (state, action) => {
      state.putRejectLoading = false;
      state.putRejectSuccess = true;
      state.putRejectData = action.payload;
    },
    putRejectDataFailed: (state) => {
      state.putRejectLoading = false;
      state.putRejectSuccess = false;
      state.putRejectFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  getUserLevelData,
  getUserLevelDataFulfilled,
  getUserLevelDataFailed,
  getapproveData,
  getapproveDataFulfilled,
  getapproveDataFailed,
  putApprovalData,
  putApprovalDataFulfilled,
  putApprovalDataFailed,
  putReleaseData,
  putReleaseDataFulfilled,
  putReleaseDataFailed,
  putRejectData,
  putRejectDataFulfilled,
  putRejectDataFailed,
  resetData,
} = medicinereleaseSlice.actions;

export default medicinereleaseSlice.reducer;
