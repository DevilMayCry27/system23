import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beneficiariesListLoading: false,
  beneficiariesListSuccess: false,
  beneficiariesListFailed: false,
  beneficiariesListData: [],

  postBeneficiariesLoading: false,
  postBeneficiariesSuccess: false,
  postBeneficiariesFailed: false,
  postBeneficiariesData: [],

  putBeneficiariesLoading: false,
  putBeneficiariesSuccess: false,
  putBeneficiariesFailed: false,
  putBeneficiariesData: [],

  delBeneficiariesLoading: false,
  delBeneficiariesSuccess: false,
  delBeneficiariesFailed: false,
  delBeneficiariesData: [],
};

export const beneficiariesSlice = createSlice({
  name: "beneficiaries",
  initialState,
  reducers: {
    resetData: (state) => {
      state.beneficiariesListLoading = false;
      state.beneficiariesListSuccess = false;
      state.beneficiariesListFailed = false;
      state.beneficiariesListData = [];
      state.postBeneficiariesLoading = false;
      state.postBeneficiariesSuccess = false;
      state.postBeneficiariesFailed = false;
      state.postBeneficiariesData = [];
      state.putBeneficiariesLoading = false;
      state.putBeneficiariesSuccess = false;
      state.putBeneficiariesFailed = false;
      state.putBeneficiariesData = [];
      state.delBeneficiariesLoading = false;
      state.delBeneficiariesSuccess = false;
      state.delBeneficiariesFailed = false;
      state.delBeneficiariesData = [];
    },
    getData: (state) => {
      state.beneficiariesListLoading = true;
      state.beneficiariesListSuccess = false;
      state.beneficiariesListFailed = false;
    },
    getDataFulfilled: (state, action) => {
      state.beneficiariesListLoading = false;
      state.beneficiariesListSuccess = true;
      state.beneficiariesListData = action.payload;
    },
    getDataFailed: (state) => {
      state.beneficiariesListLoading = false;
      state.beneficiariesListSuccess = false;
      state.beneficiariesListFailed = true;
    },

    postData: (state) => {
      state.postBeneficiariesLoading = true;
      state.postBeneficiariesSuccess = false;
      state.postBeneficiariesFailed = false;
    },
    postDataFulfilled: (state, action) => {
      state.postBeneficiariesLoading = false;
      state.postBeneficiariesSuccess = true;
      state.postBeneficiariesData = action.payload;
    },
    postDataFailed: (state) => {
      state.postBeneficiariesLoading = false;
      state.postBeneficiariesSuccess = false;
      state.postBeneficiariesFailed = true;
    },

    putData: (state) => {
      state.putBeneficiariesLoading = true;
      state.putBeneficiariesSuccess = false;
      state.putBeneficiariesFailed = false;
    },
    putDataFulfilled: (state, action) => {
      state.putBeneficiariesLoading = false;
      state.putBeneficiariesSuccess = true;
      state.putBeneficiariesData = action.payload;
    },
    putDataFailed: (state) => {
      state.putBeneficiariesLoading = false;
      state.putBeneficiariesSuccess = false;
      state.putBeneficiariesFailed = true;
    },

    delData: (state) => {
      state.delBeneficiariesLoading = true;
      state.delBeneficiariesSuccess = false;
      state.delBeneficiariesFailed = false;
    },
    delDataFulfilled: (state, action) => {
      state.delBeneficiariesLoading = false;
      state.delBeneficiariesSuccess = true;
      state.delBeneficiariesData = action.payload;
    },
    delDataFailed: (state) => {
      state.delBeneficiariesLoading = false;
      state.delBeneficiariesSuccess = false;
      state.delBeneficiariesFailed = true;
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
} = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
