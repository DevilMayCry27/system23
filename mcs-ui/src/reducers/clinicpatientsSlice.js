import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ClinicPatientsListLoading: false,
  ClinicPatientsListSuccess: false,
  ClinicPatientsListFailed: false,
  ClinicPatientsListData: [],

  postClinicPatientsLoading: false,
  postClinicPatientsSuccess: false,
  postClinicPatientsFailed: false,
  postClinicPatientsData: [],

  putClinicPatientsLoading: false,
  putClinicPatientsSuccess: false,
  putClinicPatientsFailed: false,
  putClinicPatientsData: [],

  delClinicPatientsLoading: false,
  delClinicPatientsSuccess: false,
  delClinicPatientsFailed: false,
  delClinicPatientsData: [],
};

export const ClinicPatientsSlice = createSlice({
  name: "clinicpatients",
  initialState,
  reducers: {
    resetData: (state) => {
      state.ClinicPatientsListLoading = false;
      state.ClinicPatientsListSuccess = false;
      state.ClinicPatientsListFailed = false;
      state.ClinicPatientsListData = [];
      state.postClinicPatientsLoading = false;
      state.postClinicPatientsSuccess = false;
      state.postClinicPatientsFailed = false;
      state.postClinicPatientsData = [];
      state.putClinicPatientsLoading = false;
      state.putClinicPatientsSuccess = false;
      state.putClinicPatientsFailed = false;
      state.putClinicPatientsData = [];
      state.delClinicPatientsLoading = false;
      state.delClinicPatientsSuccess = false;
      state.delClinicPatientsFailed = false;
      state.delClinicPatientsData = [];
    },
    getData: (state) => {
      state.ClinicPatientsListLoading = true;
      state.ClinicPatientsListSuccess = false;
      state.ClinicPatientsListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.ClinicPatientsListLoading = false;
      state.ClinicPatientsListSuccess = true;
      state.ClinicPatientsListData = action.payload;
    },
    getDataFailed: (state) => {
      state.ClinicPatientsListLoading = false;
      state.ClinicPatientsListSuccess = false;
      state.ClinicPatientsListFailed = true;
    },

    postData: (state) => {
      state.postClinicPatientsLoading = true;
      state.postClinicPatientsSuccess = false;
      state.postClinicPatientsFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postClinicPatientsLoading = false;
      state.postClinicPatientsSuccess = true;
      state.postClinicPatientsData = action.payload;
    },
    postDataFailed: (state) => {
      state.postClinicPatientsLoading = false;
      state.postClinicPatientsSuccess = false;
      state.postClinicPatientsFailed = true;
    },

    putData: (state) => {
      state.putClinicPatientsLoading = true;
      state.putClinicPatientsSuccess = false;
      state.putClinicPatientsFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putClinicPatientsLoading = false;
      state.putClinicPatientsSuccess = true;
      state.putClinicPatientsData = action.payload;
    },
    putDataFailed: (state) => {
      state.putClinicPatientsLoading = false;
      state.putClinicPatientsSuccess = false;
      state.putClinicPatientsFailed = true;
    },

    delData: (state) => {
      state.delClinicPatientsLoading = true;
      state.delClinicPatientsSuccess = false;
      state.delClinicPatientsFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delClinicPatientsLoading = false;
      state.delClinicPatientsSuccess = true;
      state.delClinicPatientsData = action.payload;
    },
    delDataFailed: (state) => {
      state.delClinicPatientsLoading = false;
      state.delClinicPatientsSuccess = false;
      state.delClinicPatientsFailed = true;
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
} = ClinicPatientsSlice.actions;

export default ClinicPatientsSlice.reducer;
