import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departmentListLoading: false,
  departmentListSuccess: false,
  departmentListFailed: false,
  departmentListData: [],

  postDepartmentLoading: false,
  postDepartmentSuccess: false,
  postDepartmentFailed: false,
  postDepartmentData: [],

  putDepartmentLoading: false,
  putDepartmentSuccess: false,
  putDepartmentFailed: false,
  putDepartmentData: [],

  delDepartmentLoading: false,
  delDepartmentSuccess: false,
  delDepartmentFailed: false,
  delDepartmentData: [],
};

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    resetData: (state) => {
      state.departmentListLoading = false;
      state.departmentListSuccess = false;
      state.departmentListFailed = false;
      state.departmentListData = [];
      state.postDepartmentLoading = false;
      state.postDepartmentSuccess = false;
      state.postDepartmentFailed = false;
      state.postDepartmentData = [];
      state.putDepartmentLoading = false;
      state.putDepartmentSuccess = false;
      state.putDepartmentFailed = false;
      state.putDepartmentData = [];
      state.delDepartmentLoading = false;
      state.delDepartmentSuccess = false;
      state.delDepartmentFailed = false;
      state.delDepartmentData = [];
    },
    getData: (state) => {
      state.departmentListLoading = true;
      state.departmentListSuccess = false;
      state.departmentListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.departmentListLoading = false;
      state.departmentListSuccess = true;
      state.departmentListData = action.payload;
    },
    getDataFailed: (state) => {
      state.departmentListLoading = false;
      state.departmentListSuccess = false;
      state.departmentListFailed = true;
    },

    postData: (state) => {
      state.postDepartmentLoading = true;
      state.postDepartmentSuccess = false;
      state.postDepartmentFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postDepartmentLoading = false;
      state.postDepartmentSuccess = true;
      state.postDepartmentData = action.payload;
    },
    postDataFailed: (state) => {
      state.postDepartmentLoading = false;
      state.postDepartmentSuccess = false;
      state.postDepartmentFailed = true;
    },

    putData: (state) => {
      state.putDepartmentLoading = true;
      state.putDepartmentSuccess = false;
      state.putDepartmentFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putDepartmentLoading = false;
      state.putDepartmentSuccess = true;
      state.putDepartmentData = action.payload;
    },
    putDataFailed: (state) => {
      state.putDepartmentLoading = false;
      state.putDepartmentSuccess = false;
      state.putDepartmentFailed = true;
    },

    delData: (state) => {
      state.delDepartmentLoading = true;
      state.delDepartmentSuccess = false;
      state.delDepartmentFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delDepartmentLoading = false;
      state.delDepartmentSuccess = true;
      state.delDepartmentData = action.payload;
    },
    delDataFailed: (state) => {
      state.delDepartmentLoading = false;
      state.delDepartmentSuccess = false;
      state.delDepartmentFailed = true;
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
} = departmentSlice.actions;

export default departmentSlice.reducer;
