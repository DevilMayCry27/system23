import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultationListLoading: false,
  consultationListSuccess: false,
  consultationListFailed: false,
  consultationListData: [],

  postConsultationLoading: false,
  postConsultationSuccess: false,
  postConsultationFailed: false,
  postConsultationData: [],

  putConsultationLoading: false,
  putConsultationSuccess: false,
  putConsultationFailed: false,
  putConsultationData: [],

  delConsultationLoading: false,
  delConsultationSuccess: false,
  delConsultationFailed: false,
  delConsultationData: [],
};

export const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    resetData: (state) => {
      state.consultationListLoading = false;
      state.consultationListSuccess = false;
      state.consultationListFailed = false;
      state.consultationListData = [];
      state.postConsultationLoading = false;
      state.postConsultationSuccess = false;
      state.postConsultationFailed = false;
      state.postConsultationData = [];
      state.putConsultationLoading = false;
      state.putConsultationSuccess = false;
      state.putConsultationFailed = false;
      state.putConsultationData = [];
      state.delConsultationLoading = false;
      state.delConsultationSuccess = false;
      state.delConsultationFailed = false;
      state.delConsultationData = [];
    },
    getData: (state) => {
      state.consultationListLoading = true;
      state.consultationListSuccess = false;
      state.consultationListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.consultationListLoading = false;
      state.consultationListSuccess = true;
      state.consultationListData = action.payload;
    },
    getDataFailed: (state) => {
      state.consultationListLoading = false;
      state.consultationListSuccess = false;
      state.consultationListFailed = true;
    },

    postData: (state) => {
      state.postConsultationLoading = true;
      state.postConsultationSuccess = false;
      state.postConsultationFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postConsultationLoading = false;
      state.postConsultationSuccess = true;
      state.postConsultationData = action.payload;
    },
    postDataFailed: (state) => {
      state.postConsultationLoading = false;
      state.postConsultationSuccess = false;
      state.postConsultationFailed = true;
    },

    putData: (state) => {
      state.putConsultationLoading = true;
      state.putConsultationSuccess = false;
      state.putConsultationFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putConsultationLoading = false;
      state.putConsultationSuccess = true;
      state.putConsultationData = action.payload;
    },
    putDataFailed: (state) => {
      state.putConsultationLoading = false;
      state.putConsultationSuccess = false;
      state.putConsultationFailed = true;
    },

    delData: (state) => {
      state.delConsultationLoading = true;
      state.delConsultationSuccess = false;
      state.delConsultationFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delConsultationLoading = false;
      state.delConsultationSuccess = true;
      state.delConsultationData = action.payload;
    },
    delDataFailed: (state) => {
      state.delConsultationLoading = false;
      state.delConsultationSuccess = false;
      state.delConsultationFailed = true;
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
} = consultationSlice.actions;

export default consultationSlice.reducer;
