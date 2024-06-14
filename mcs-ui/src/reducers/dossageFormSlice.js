import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dossageFormListLoading: false,
  dossageFormListSuccess: false,
  dossageFormListFailed: false,
  dossageFormListData: [],

  postDossageFormLoading: false,
  postDossageFormSuccess: false,
  postDossageFormFailed: false,
  postDossageFormData: [],

  putDossageFormLoading: false,
  putDossageFormSuccess: false,
  putDossageFormFailed: false,
  putDossageFormData: [],

  delDossageFormLoading: false,
  delDossageFormSuccess: false,
  delDossageFormFailed: false,
  delDossageFormData: [],
}

export const dossageFormSlice = createSlice({
  name: 'dossage',
  initialState,
  reducers: {
    resetData: (state) => {
      state.dossageFormListLoading = false
      state.dossageFormListSuccess = false
      state.dossageFormListFailed = false
      state.dossageFormListData = []
      state.postDossageFormLoading = false
      state.postDossageFormSuccess = false
      state.postDossageFormFailed = false
      state.postDossageFormData = []
      state.putDossageFormLoading = false
      state.putDossageFormSuccess = false
      state.putDossageFormFailed = false
      state.putDossageFormData = []
      state.delDossageFormLoading = false
      state.delDossageFormSuccess = false
      state.delDossageFormFailed = false
      state.delDossageFormData = []
    },
    getData: (state) => {
      state.dossageFormListLoading = true
      state.dossageFormListSuccess = false
      state.dossageFormListFailed = false
    },
    getDataFulfilled: (state,action) => {
      state.dossageFormListLoading = false
      state.dossageFormListSuccess = true
      state.dossageFormListData = action.payload
    },
    getDataFailed: (state) => {
      state.dossageFormListLoading = false
      state.dossageFormListSuccess = false
      state.dossageFormListFailed = true
    },

    postData: (state) => {
      state.postDossageFormLoading = true
      state.postDossageFormSuccess = false
      state.postDossageFormFailed = false
    },
    postDataFulfilled: (state,action) => {
      state.postDossageFormLoading = false
      state.postDossageFormSuccess = true
      state.postDossageFormData = action.payload
    },
    postDataFailed: (state) => {
      state.postDossageFormLoading = false
      state.postDossageFormSuccess = false
      state.postDossageFormFailed = true
    },

    putData: (state) => {
      state.putDossageFormLoading = true
      state.putDossageFormSuccess = false
      state.putDossageFormFailed = false
    },
    putDataFulfilled: (state,action) => {
      state.putDossageFormLoading = false
      state.putDossageFormSuccess = true
      state.putDossageFormData = action.payload
    },
    putDataFailed: (state) => {
      state.putDossageFormLoading = false
      state.putDossageFormSuccess = false
      state.putDossageFormFailed = true
    },

    delData: (state) => {
      state.delDossageFormLoading = true
      state.delDossageFormSuccess = false
      state.delDossageFormFailed = false
    },
    delDataFulfilled: (state,action) => {
      state.delDossageFormLoading = false
      state.delDossageFormSuccess = true
      state.delDossageFormData = action.payload
    },
    delDataFailed: (state) => {
      state.delDossageFormLoading = false
      state.delDossageFormSuccess = false
      state.delDossageFormFailed = true
    },
  },
})

export const { 
  getData, getDataFulfilled, getDataFailed, 
  postData, postDataFulfilled, postDataFailed,
  putData, putDataFulfilled, putDataFailed,
  delData, delDataFulfilled, delDataFailed,
  resetData,
} = dossageFormSlice.actions

export default dossageFormSlice.reducer