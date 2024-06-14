import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicineapproverLoading: false,
  medicineapproverSuccess: false,
  medicineapproverFailed: false,
  medicineapproverData: [],

  authorizepersonelLoading: false,
  authorizepersonelSuccess: false,
  authorizepersonelFailed: false,
  authorizepersonelData: [],

  postMedicineapproverLoading: false,
  postMedicineapproverSuccess: false,
  postMedicineapproverFailed: false,
  postMedicineapproverData: [],

  delMedicineapproverLoading: false,
  delMedicineapproverSuccess: false,
  delMedicineapproverFailed: false,
  delMedicineapproverData: [],
};

export const medicineapproverSlice = createSlice({
  name: "medicineapprover",
  initialState,
  reducers: {
    resetData: (state) => {
      state.medicineapproverLoading = false;
      state.medicineapproverSuccess = false;
      state.medicineapproverFailed = false;
      state.medicineapproverData = [];

      state.authorizepersonelLoading = false;
      state.authorizepersonelSuccess = false;
      state.authorizepersonelFailed = false;
      state.authorizepersonelData = [];

      state.postMedicineapproverLoading = false;
      state.postMedicineapproverSuccess = false;
      state.postMedicineapproverFailed = false;
      state.postMedicineapproverData = [];

      state.delMedicineapproverLoading = false;
      state.delMedicineapproverSuccess = false;
      state.delMedicineapproverFailed = false;
      state.delMedicineapproverData = [];
    },

    getData: (state) => {
      state.medicineapproverLoading = true;
      state.medicineapproverSuccess = false;
      state.medicineapproverFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.medicineapproverLoading = false;
      state.medicineapproverSuccess = true;
      state.medicineapproverData = action.payload;
    },
    getDataFailed: (state) => {
      state.medicineapproverSuccess = false;
      state.medicineapproverSuccess = false;
      state.medicineapproverSuccess = true;
    },
    getAuthorizePersonelData: (state) => {
      state.authorizepersonelLoading = true;
      state.authorizepersonelSuccess = false;
      state.authorizepersonelFailed = false;
    },
    getAuthorizePersonelDataFulfilled: (state, action) => {
      state.authorizepersonelLoading = false;
      state.authorizepersonelSuccess = true;
      state.authorizepersonelData = action.payload;
    },
    getAuthorizePersonelDataFailed: (state) => {
      state.authorizepersonelSuccess = false;
      state.authorizepersonelSuccess = false;
      state.authorizepersonelSuccess = true;
    },
    postData: (state) => {
      state.postMedicineapproverLoading = true;
      state.postMedicineapproverSuccess = false;
      state.postMedicineapproverFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postMedicineapproverLoading = false;
      state.postMedicineapproverSuccess = true;
      state.postMedicineapproverData = action.payload;
    },
    postDataFailed: (state) => {
      state.postMedicineapproverLoading = false;
      state.postMedicineapproverSuccess = false;
      state.postMedicineapproverFailed = true;
    },

    delData: (state) => {
      state.delMedicineapproverLoading = true;
      state.delMedicineapproverSuccess = false;
      state.delMedicineapproverFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delMedicineapproverLoading = false;
      state.delMedicineapproverSuccess = true;
      state.delMedicineapproverData = action.payload;
    },
    delDataFailed: (state) => {
      state.delMedicineapproverLoading = false;
      state.delMedicineapproverSuccess = false;
      state.delMedicineapproverFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  getAuthorizePersonelData,
  getAuthorizePersonelDataFulfilled,
  getAuthorizePersonelDataFailed,
  postData,
  postDataFulfilled,
  postDataFailed,
  delData,
  delDataFulfilled,
  delDataFailed,
  resetData,
} = medicineapproverSlice.actions;

export default medicineapproverSlice.reducer;
