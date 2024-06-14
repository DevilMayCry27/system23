import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  municipalityListLoading: false,
  municipalityListSuccess: false,
  municipalityListFailed: false,
  municipalityListData: [],
};

export const municipalitySlice = createSlice({
  name: "municipality",
  initialState,
  reducers: {
    resetData: (state) => {
      state.municipalityListLoading = false;
      state.municipalityListSuccess = false;
      state.municipalityListFailed = false;
      state.municipalityListData = [];
    },
    getData: (state) => {
      state.municipalityListLoading = true;
      state.municipalityListSuccess = false;
      state.municipalityListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.municipalityListLoading = false;
      state.municipalityListSuccess = true;
      state.municipalityListData = action.payload;
    },
    getDataFailed: (state) => {
      state.municipalityListLoading = false;
      state.municipalityListSuccess = false;
      state.municipalityListFailed = true;
    },
  },
});

export const { getData, getDataFulfilled, getDataFailed, resetData } =
  municipalitySlice.actions;

export default municipalitySlice.reducer;
