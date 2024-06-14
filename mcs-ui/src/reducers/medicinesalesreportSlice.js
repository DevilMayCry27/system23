import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicinesalesreportLoading: false,
  medicinesalesreportSuccess: false,
  medicinesalesreportFailed: false,
  medicinesalesreportData: [],

  medicinesalesitemsLoading: false,
  medicinesalesitemsSuccess: false,
  medicinesalesitemsFailed: false,
  medicinesalesitemsData: [],

  medicinesalestypeLoading: false,
  medicinesalestypeSuccess: false,
  medicinesalestypeFailed: false,
  medicinesalestypeData: [],
};

export const medicinesalesreportSlice = createSlice({
  name: "medicinesalesreport",
  initialState,
  reducers: {
    resetData: (state) => {
      state.medicinesalesreportLoading = false;
      state.medicinesalesreportSuccess = false;
      state.medicinesalesreportFailed = false;
      state.medicinesalesreportData = [];

      state.medicinesalesitemsLoading = false;
      state.medicinesalesitemsSuccess = false;
      state.medicinesalesitemsFailed = false;
      state.medicinesalesitemsData = [];

      state.medicinesalestypeLoading = false;
      state.medicinesalestypeSuccess = false;
      state.medicinesalestypeFailed = false;
      state.medicinesalestypeData = [];
    },
    getData: (state) => {
      state.medicinesalesreportLoading = true;
      state.medicinesalesreportSuccess = false;
      state.medicinesalesreportFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.medicinesalesreportLoading = false;
      state.medicinesalesreportSuccess = true;
      state.medicinesalesreportData = action.payload;
    },
    getDataFailed: (state) => {
      state.medicinesalesreportLoading = false;
      state.medicinesalesreportSuccess = false;
      state.medicinesalesreportFailed = true;
    },

    getItemsData: (state) => {
      state.medicinesalesitemsLoading = true;
      state.medicinesalesitemsSuccess = false;
      state.medicinesalesitemsFailed = false;
    },
    getItemsDataFulfilled: (state, action) => {
      state.medicinesalesitemsLoading = false;
      state.medicinesalesitemsSuccess = true;
      state.medicinesalesitemsData = action.payload;
    },
    getItemsDataFailed: (state) => {
      state.medicinesalesitemsLoading = false;
      state.medicinesalesitemsSuccess = false;
      state.medicinesalesitemsFailed = true;
    },

    getTypeData: (state) => {
      state.medicinesalestypeLoading = true;
      state.medicinesalestypeSuccess = false;
      state.medicinesalestypeFailed = false;
    },
    getTypeDataFulfilled: (state, action) => {
      state.medicinesalestypeLoading = false;
      state.medicinesalestypeSuccess = true;
      state.medicinesalestypeData = action.payload;
    },
    getTypeDataFailed: (state) => {
      state.medicinesalestypeLoading = false;
      state.medicinesalestypeSuccess = false;
      state.medicinesalestypeFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,
  getItemsData,
  getItemsDataFulfilled,
  getItemsDataFailed,
  getTypeData,
  getTypeDataFulfilled,
  getTypeDataFailed,
  resetData,
} = medicinesalesreportSlice.actions;

export default medicinesalesreportSlice.reducer;
