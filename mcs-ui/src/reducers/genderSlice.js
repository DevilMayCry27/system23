import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genderListLoading: false,
  genderListSuccess: false,
  genderListFailed: false,
  genderListData: [],

  postGenderLoading: false,
  postGenderSuccess: false,
  postGenderFailed: false,
  postGenderData: [],

  putGenderLoading: false,
  putGenderSuccess: false,
  putGenderFailed: false,
  putGenderData: [],

  delGenderLoading: false,
  delGenderSuccess: false,
  delGenderFailed: false,
  delGenderData: [],
};

export const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    resetData: (state) => {
      state.genderListLoading = false;
      state.genderListSuccess = false;
      state.genderListFailed = false;
      state.genderListData = [];
      state.postGenderLoading = false;
      state.postGenderSuccess = false;
      state.postGenderFailed = false;
      state.postGenderData = [];
      state.putGenderLoading = false;
      state.putGenderSuccess = false;
      state.putGenderFailed = false;
      state.putGenderData = [];
      state.delGenderLoading = false;
      state.delGenderSuccess = false;
      state.delGenderFailed = false;
      state.delGenderData = [];
    },
    getData: (state) => {
      state.genderListLoading = true;
      state.genderListSuccess = false;
      state.genderListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.genderListLoading = false;
      state.genderListSuccess = true;
      state.genderListData = action.payload;
    },
    getDataFailed: (state) => {
      state.genderListLoading = false;
      state.genderListSuccess = false;
      state.genderListFailed = true;
    },

    postData: (state) => {
      state.postGenderLoading = true;
      state.postGenderSuccess = false;
      state.postGenderFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postGenderLoading = false;
      state.postGenderSuccess = true;
      state.postGenderData = action.payload;
    },
    postDataFailed: (state) => {
      state.postGenderLoading = false;
      state.postGenderSuccess = false;
      state.postGenderFailed = true;
    },

    putData: (state) => {
      state.putGenderLoading = true;
      state.putGenderSuccess = false;
      state.putGenderFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putGenderLoading = false;
      state.putGenderSuccess = true;
      state.putGenderData = action.payload;
    },
    putDataFailed: (state) => {
      state.putGenderLoading = false;
      state.putGenderSuccess = false;
      state.putGenderFailed = true;
    },

    delData: (state) => {
      state.delGenderLoading = true;
      state.delGenderSuccess = false;
      state.delGenderFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delGenderLoading = false;
      state.delGenderSuccess = true;
      state.delGenderData = action.payload;
    },
    delDataFailed: (state) => {
      state.delGenderLoading = false;
      state.delGenderSuccess = false;
      state.delGenderFailed = true;
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
} = genderSlice.actions;

export default genderSlice.reducer;
