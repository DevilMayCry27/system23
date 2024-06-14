import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicineordernumberLoading: false,
  medicineordernumberSuccess: false,
  medicineordernumberFailed: false,
  medicineordernumberData: [],

  allmedicineorderListLoading: false,
  allmedicineorderListSuccess: false,
  allmedicineorderListFailed: false,
  allmedicineorderListData: [],

  medicineorderListLoading: false,
  medicineorderListSuccess: false,
  medicineorderListFailed: false,
  medicineorderListData: [],

  postMedicineorderLoading: false,
  postMedicineorderSuccess: false,
  postMedicineorderFailed: false,
  postMedicineorderData: [],
};

export const medicineorderSlice = createSlice({
  name: "medicineorder",
  initialState,
  reducers: {
    resetData: (state) => {
      state.medicineordernumberLoading = false;
      state.medicineordernumberSuccess = false;
      state.medicineordernumberFailed = false;
      state.medicineordernumberData = [];
      state.allmedicineorderListLoading = false;
      state.allmedicineorderListSuccess = false;
      state.allmedicineorderListFailed = false;
      state.allmedicineorderListData = [];
      state.medicineorderListLoading = false;
      state.medicineorderListSuccess = false;
      state.medicineorderListFailed = false;
      state.medicineorderListData = [];
      state.postMedicineorderLoading = false;
      state.postMedicineorderSuccess = false;
      state.postMedicineorderFailed = false;
      state.postMedicineorderData = [];
    },

    getnumberData: (state) => {
      state.medicineordernumberLoading = true;
      state.medicineordernumberSuccess = false;
      state.medicineordernumberFailed = false;
    },
    getnumberDataFulfilled: (state, action) => {
      state.medicineordernumberLoading = false;
      state.medicineordernumberSuccess = true;
      state.medicineordernumberData = action.payload;
    },
    getnumberDataFailed: (state) => {
      state.medicineordernumberSuccess = false;
      state.medicineordernumberSuccess = false;
      state.medicineordernumberSuccess = true;
    },

    getallData: (state) => {
      state.allmedicineorderListLoading = true;
      state.allmedicineorderListSuccess = false;
      state.allmedicineorderListFailed = false;
    },
    getallDataFulfilled: (state, action) => {
      state.allmedicineorderListLoading = false;
      state.allmedicineorderListSuccess = true;
      state.allmedicineorderListData = action.payload;
    },
    getallDataFailed: (state) => {
      state.allmedicineorderListLoading = false;
      state.allmedicineorderListSuccess = false;
      state.allmedicineorderListFailed = true;
    },

    getData: (state) => {
      state.medicineorderListLoading = true;
      state.medicineorderListSuccess = false;
      state.medicineorderListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.medicineorderListLoading = false;
      state.medicineorderListSuccess = true;
      state.medicineorderListData = action.payload;
    },
    getDataFailed: (state) => {
      state.medicineorderListLoading = false;
      state.medicineorderListSuccess = false;
      state.medicineorderListFailed = true;
    },

    postData: (state) => {
      state.postMedicineorderLoading = true;
      state.postMedicineorderSuccess = false;
      state.postMedicineorderFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postMedicineorderLoading = false;
      state.postMedicineorderSuccess = true;
      state.postMedicineorderData = action.payload;
    },
    postDataFailed: (state) => {
      state.postMedicineorderLoading = false;
      state.postMedicineorderSuccess = false;
      state.postMedicineorderFailed = true;
    },
  },
});

export const {
  getnumberData,
  getnumberDataFulfilled,
  getnumberDataFailed,
  getallData,
  getallDataFulfilled,
  getallDataFailed,
  getData,
  getDataFulfilled,
  getDataFailed,
  postData,
  postDataFulfilled,
  postDataFailed,
  resetData,
} = medicineorderSlice.actions;

export default medicineorderSlice.reducer;
