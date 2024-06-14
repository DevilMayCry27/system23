import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientListLoading: false,
  patientListSuccess: false,
  patientListFailed: false,
  patientListData: [],

  postPatientLoading: false,
  postPatientSuccess: false,
  postPatientFailed: false,
  postPatientData: [],

  putPatientLoading: false,
  putPatientSuccess: false,
  putPatientFailed: false,
  putPatientData: [],

  delPatientLoading: false,
  delPatientSuccess: false,
  delPatientFailed: false,
  delPatientData: [],
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    resetData: (state) => {
      state.patientListLoading = false;
      state.patientListSuccess = false;
      state.patientListFailed = false;
      state.patientListData = [];
      state.postPatientLoading = false;
      state.postPatientSuccess = false;
      state.postPatientFailed = false;
      state.postPatientData = [];
      state.putPatientLoading = false;
      state.putPatientSuccess = false;
      state.putPatientFailed = false;
      state.putPatientData = [];
      state.delPatientLoading = false;
      state.delPatientSuccess = false;
      state.delPatientFailed = false;
      state.delPatientData = [];
    },
    getData: (state) => {
      state.patientListLoading = true;
      state.patientListSuccess = false;
      state.patientListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.patientListLoading = false;
      state.patientListSuccess = true;
      state.patientListData = action.payload;
    },
    getDataFailed: (state) => {
      state.patientListLoading = false;
      state.patientListSuccess = false;
      state.patientListFailed = true;
    },

    postData: (state) => {
      state.postPatientLoading = true;
      state.postPatientSuccess = false;
      state.postPatientFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postPatientLoading = false;
      state.postPatientSuccess = true;
      state.postPatientData = action.payload;
    },
    postDataFailed: (state) => {
      state.postPatientLoading = false;
      state.postPatientSuccess = false;
      state.postPatientFailed = true;
    },

    putData: (state) => {
      state.putPatientLoading = true;
      state.putPatientSuccess = false;
      state.putPatientFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putPatientLoading = false;
      state.putPatientSuccess = true;
      state.putPatientData = action.payload;
    },
    putDataFailed: (state) => {
      state.putPatientLoading = false;
      state.putPatientSuccess = false;
      state.putPatientFailed = true;
    },

    delData: (state) => {
      state.delPatientLoading = true;
      state.delPatientSuccess = false;
      state.delPatientFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delPatientLoading = false;
      state.delPatientSuccess = true;
      state.delPatientData = action.payload;
    },
    delDataFailed: (state) => {
      state.delPatientLoading = false;
      state.delPatientSuccess = false;
      state.delPatientFailed = true;
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
} = patientSlice.actions;

export default patientSlice.reducer;
