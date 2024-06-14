import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uomListLoading: false,
  uomListSuccess: false,
  uomListFailed: false,
  uomListData: [],

  postUomLoading: false,
  postUomSuccess: false,
  postUomFailed: false,
  postUomData: [],

  putUomLoading: false,
  putUomSuccess: false,
  putUomFailed: false,
  putUomData: [],

  delUomLoading: false,
  delUomSuccess: false,
  delUomFailed: false,
  delUomData: [],
};

export const uomSlice = createSlice({
  name: "uom",
  initialState,
  reducers: {
    resetData: (state) => {
      state.uomListLoading = false;
      state.uomListSuccess = false;
      state.uomListFailed = false;
      state.uomListData = [];
      state.postUomLoading = false;
      state.postUomSuccess = false;
      state.postUomFailed = false;
      state.postUomData = [];
      state.putUomLoading = false;
      state.putUomSuccess = false;
      state.putUomFailed = false;
      state.putUomData = [];
      state.delUomLoading = false;
      state.delUomSuccess = false;
      state.delUomFailed = false;
      state.delUomData = [];
    },
    getData: (state) => {
      state.uomListLoading = true;
      state.uomListSuccess = false;
      state.uomListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.uomListLoading = false;
      state.uomListSuccess = true;
      state.uomListData = action.payload;
    },
    getDataFailed: (state) => {
      state.uomListLoading = false;
      state.uomListSuccess = false;
      state.uomListFailed = true;
    },

    postData: (state) => {
      state.postUomLoading = true;
      state.postUomSuccess = false;
      state.postUomFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postUomLoading = false;
      state.postUomSuccess = true;
      state.postUomData = action.payload;
    },
    postDataFailed: (state) => {
      state.postUomLoading = false;
      state.postUomSuccess = false;
      state.postUomFailed = true;
    },

    putData: (state) => {
      state.putUomLoading = true;
      state.putUomSuccess = false;
      state.putUomFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putUomLoading = false;
      state.putUomSuccess = true;
      state.putUomData = action.payload;
    },
    putDataFailed: (state) => {
      state.putUomLoading = false;
      state.putUomSuccess = false;
      state.putUomFailed = true;
    },

    delData: (state) => {
      state.delUomLoading = true;
      state.delUomSuccess = false;
      state.delUomFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delUomLoading = false;
      state.delUomSuccess = true;
      state.delUomData = action.payload;
    },
    delDataFailed: (state) => {
      state.delUomLoading = false;
      state.delUomSuccess = false;
      state.delUomFailed = true;
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
} = uomSlice.actions;

export default uomSlice.reducer;
