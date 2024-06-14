import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  positionListLoading: false,
  positionListSuccess: false,
  positionListFailed: false,
  positionListData: [],

  postPositionLoading: false,
  postPositionSuccess: false,
  postPositionFailed: false,
  postPositionData: [],

  putPositionLoading: false,
  putPositionSuccess: false,
  putPositionFailed: false,
  putPositionData: [],

  delPositionLoading: false,
  delPositionSuccess: false,
  delPositionFailed: false,
  delPositionData: [],
}

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    resetData: (state) => {
      state.positionListLoading = false
      state.positionListSuccess = false
      state.positionListFailed = false
      state.positionListData = []
      state.postPositionLoading = false
      state.postPositionSuccess = false
      state.postPositionFailed = false
      state.postPositionData = []
      state.putPositionLoading = false
      state.putPositionSuccess = false
      state.putPositionFailed = false
      state.putPositionData = []
      state.delPositionLoading = false
      state.delPositionSuccess = false
      state.delPositionFailed = false
      state.delPositionData = []
    },
    getData: (state) => {
      state.positionListLoading = true
      state.positionListSuccess = false
      state.positionListFailed = false
    },
    getDataFulfilled: (state,action) => {
      state.positionListLoading = false
      state.positionListSuccess = true
      state.positionListData = action.payload
    },
    getDataFailed: (state) => {
      state.positionListLoading = false
      state.positionListSuccess = false
      state.positionListFailed = true
    },

    postData: (state) => {
      state.postPositionLoading = true
      state.postPositionSuccess = false
      state.postPositionFailed = false
    },
    postDataFulfilled: (state,action) => {
      state.postPositionLoading = false
      state.postPositionSuccess = true
      state.postPositionData = action.payload
    },
    postDataFailed: (state) => {
      state.postPositionLoading = false
      state.postPositionSuccess = false
      state.postPositionFailed = true
    },

    putData: (state) => {
      state.putPositionLoading = true
      state.putPositionSuccess = false
      state.putPositionFailed = false
    },
    putDataFulfilled: (state,action) => {
      state.putPositionLoading = false
      state.putPositionSuccess = true
      state.putPositionData = action.payload
    },
    putDataFailed: (state) => {
      state.putPositionLoading = false
      state.putPositionSuccess = false
      state.putPositionFailed = true
    },

    delData: (state) => {
      state.delPositionLoading = true
      state.delPositionSuccess = false
      state.delPositionFailed = false
    },
    delDataFulfilled: (state,action) => {
      state.delPositionLoading = false
      state.delPositionSuccess = true
      state.delPositionData = action.payload
    },
    delDataFailed: (state) => {
      state.delPositionLoading = false
      state.delPositionSuccess = false
      state.delPositionFailed = true
    },
  },
})

export const { 
  getData, getDataFulfilled, getDataFailed, 
  postData, postDataFulfilled, postDataFailed,
  putData, putDataFulfilled, putDataFailed,
  delData, delDataFulfilled, delDataFailed,
  resetData,
} = positionSlice.actions

export default positionSlice.reducer