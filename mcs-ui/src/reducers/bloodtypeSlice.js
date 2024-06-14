import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bloodtypeListLoading: false,
  bloodtypeListSuccess: false,
  bloodtypeListFailed: false,
  bloodtypeListData: [],

  postBloodtypeLoading: false,
  postBloodtypeSuccess: false,
  postBloodtypeFailed: false,
  postBloodtypeData: [],

  putBloodtypeLoading: false,
  putBloodtypeSuccess: false,
  putBloodtypeFailed: false,
  putBloodtypeData: [],

  delBloodtypeLoading: false,
  delBloodtypeSuccess: false,
  delBloodtypeFailed: false,
  delBloodtypeData: [],
};

export const bloodtypeSlice = createSlice({
  name: "bloodtype",
  initialState,
  reducers: {
    resetData: (state) => {
      state.bloodtypeListLoading = false;
      state.bloodtypeListSuccess = false;
      state.bloodtypeListFailed = false;
      state.bloodtypeListData = [];
      state.postBloodtypeLoading = false;
      state.postBloodtypeSuccess = false;
      state.postBloodtypeFailed = false;
      state.postBloodtypeData = [];
      state.putBloodtypeLoading = false;
      state.putBloodtypeSuccess = false;
      state.putBloodtypeFailed = false;
      state.putBloodtypeData = [];
      state.delBloodtypeLoading = false;
      state.delBloodtypeSuccess = false;
      state.delBloodtypeFailed = false;
      state.delBloodtypeData = [];
    },
    getData: (state) => {
      state.bloodtypeListLoading = true;
      state.bloodtypeListSuccess = false;
      state.bloodtypeListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.bloodtypeListLoading = false;
      state.bloodtypeListSuccess = true;
      state.bloodtypeListData = action.payload;
    },
    getDataFailed: (state) => {
      state.bloodtypeListLoading = false;
      state.bloodtypeListSuccess = false;
      state.bloodtypeListFailed = true;
    },

    postData: (state) => {
      state.postBloodtypeLoading = true;
      state.postBloodtypeSuccess = false;
      state.postBloodtypeFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postBloodtypeLoading = false;
      state.postBloodtypeSuccess = true;
      state.postBloodtypeData = action.payload;
    },
    postDataFailed: (state) => {
      state.postBloodtypeLoading = false;
      state.postBloodtypeSuccess = false;
      state.postBloodtypeFailed = true;
    },

    putData: (state) => {
      state.putBloodtypeLoading = true;
      state.putBloodtypeSuccess = false;
      state.putBloodtypeFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putBloodtypeLoading = false;
      state.putBloodtypeSuccess = true;
      state.putBloodtypeData = action.payload;
    },
    putDataFailed: (state) => {
      state.putBloodtypeLoading = false;
      state.putBloodtypeSuccess = false;
      state.putBloodtypeFailed = true;
    },

    delData: (state) => {
      state.delBloodtypeLoading = true;
      state.delBloodtypeSuccess = false;
      state.delBloodtypeFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delBloodtypeLoading = false;
      state.delBloodtypeSuccess = true;
      state.delBloodtypeData = action.payload;
    },
    delDataFailed: (state) => {
      state.delBloodtypeLoading = false;
      state.delBloodtypeSuccess = false;
      state.delBloodtypeFailed = true;
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
} = bloodtypeSlice.actions;

export default bloodtypeSlice.reducer;
