import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileListLoading: false,
  profileListSuccess: false,
  profileListFailed: false,
  profileListData: [],

  postProfilePicLoading: false,
  postProfilePicSuccess: false,
  postProfilePicFailed: false,
  postProfilePicData: [],

  putProfileLoading: false,
  putProfileSuccess: false,
  putProfileFailed: false,
  putProfileData: [],

  postProfileLoading: false,
  postProfileSuccess: false,
  postProfileFailed: false,
  postProfileData: [],

  putPasswordChangeLoading: false,
  putPasswordChangeSuccess: false,
  putPasswordChangeFailed: false,
  putPasswordChangeData: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetData: (state) => {
      state.profileListLoading = false;
      state.profileListSuccess = false;
      state.profileListFailed = false;
      state.profileListData = [];
    },
    refreshState: (state) => {
      state.profileListLoading = false;
      state.profileListSuccess = false;
      state.profileListFailed = false;
      state.postProfilePicLoading = false;
      state.postProfilePicSuccess = false;
      state.putProfileLoading = false;
      state.putProfileSuccess = false;
      state.putProfileFailed = false;
      state.putPasswordChangeLoading = false;
      state.putPasswordChangeSuccess = false;
      state.putPasswordChangeFailed = false;
    },
    getData: (state) => {
      state.profileListLoading = true;
      state.profileListSuccess = false;
      state.profileListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.profileListLoading = false;
      state.profileListSuccess = true;
      state.profileListData = action.payload;
    },
    getDataFailed: (state) => {
      state.profileListLoading = false;
      state.profileListSuccess = false;
      state.profileListFailed = true;
    },

    putProfilePicData: (state) => {
      state.postProfilePicLoading = true;
      state.postProfilePicSuccess = false;
      state.postProfilePicFailed = false;
    },
    putProfilePicDataFulfilled: (state, action) => {
      state.postProfilePicLoading = false;
      state.postProfilePicSuccess = true;
      state.postProfilePicData = action.payload;
    },
    putProfilePicFailed: (state) => {
      state.postProfilePicLoading = false;
      state.postProfilePicSuccess = false;
      state.postProfilePicFailed = true;
    },
    putData: (state) => {
      state.putProfileLoading = true;
      state.putProfileSuccess = false;
      state.putProfileFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postProfileLoading = false;
      state.postProfileSuccess = true;
      state.postProfileData = action.payload;
    },
    postDataFailed: (state) => {
      state.postProfileLoading = false;
      state.postProfileSuccess = false;
      state.postProfileFailed = true;
    },

    putPassChangeData: (state) => {
      state.putPasswordChangeLoading = true;
      state.putPasswordChangeSuccess = false;
      state.putPasswordChangeFailed = false;
    },
    putPassChangeDataFulfilled: (state, action) => {
      state.putPasswordChangeLoading = false;
      state.putPasswordChangeSuccess = true;
      state.putPasswordChangeData = action.payload;
    },
    putPassChangeDataFailed: (state) => {
      state.putPasswordChangeLoading = false;
      state.putPasswordChangeSuccess = false;
      state.putPasswordChangeFailed = true;
    },
  },
});

export const {
  getData,
  getDataFulfilled,
  getDataFailed,

  putProfilePicData,
  putProfilePicDataFulfilled,
  putProfilePicFailed,

  putData,
  putDataFulfilled,
  putDataFailed,

  putPassChangeData,
  putPassChangeDataFulfilled,
  putPassChangeDataFailed,

  resetData,
  refreshState,
} = profileSlice.actions;

export default profileSlice.reducer;
