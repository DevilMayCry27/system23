import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicalrecordListLoading: false,
  medicalrecordListSuccess: false,
  medicalrecordListFailed: false,
  medicalrecordListData: [],
};

export const medicalrecordSlice = createSlice({
  name: "medicalrecord",
  initialState,
  reducers: {
    resetData: (state) => {
      state.medicalrecordListLoading = false;
      state.medicalrecordListSuccess = false;
      state.medicalrecordListFailed = false;
      state.medicalrecordListData = [];
    },
    getData: (state) => {
      state.medicalrecordListLoading = true;
      state.medicalrecordListSuccess = false;
      state.medicalrecordListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.medicalrecordListLoading = false;
      state.medicalrecordListSuccess = true;
      state.medicalrecordListData = action.payload;
    },
    getDataFailed: (state) => {
      state.medicalrecordListLoading = false;
      state.medicalrecordListSuccess = false;
      state.medicalrecordListFailed = true;
    },
  },
});

export const { getData, getDataFulfilled, getDataFailed, resetData } =
  medicalrecordSlice.actions;

export default medicalrecordSlice.reducer;
