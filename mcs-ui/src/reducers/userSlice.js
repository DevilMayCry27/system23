import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userListLoading: false,
  userListSuccess: false,
  userListFailed: false,
  userListData: [],

  postUserLoading: false,
  postUserSuccess: false,
  postUserFailed: false,
  postUserData: [],

  putUserLoading: false,
  putUserSuccess: false,
  putUserFailed: false,
  putUserData: [],

  delUserLoading: false,
  delUserSuccess: false,
  delUserFailed: false,
  delUserData: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetData: (state) => {
      state.userListLoading = false
      state.userListSuccess = false
      state.userListFailed = false
      state.userListData = []
      state.postUserLoading = false
      state.postUserSuccess = false
      state.postUserFailed = false
      state.postUserData = []
      state.putUserLoading = false
      state.putUserSuccess = false
      state.putUserFailed = false
      state.putUserData = []
      state.delUserLoading = false
      state.delUserSuccess = false
      state.delUserFailed = false
      state.delUserData = []
    },
    getData: (state) => {
      state.userListLoading = true
      state.userListSuccess = false
      state.userListFailed = false
    },
    getDataFulfilled: (state,action) => {
      state.userListLoading = false
      state.userListSuccess = true
      state.userListData = action.payload
    },
    getDataFailed: (state) => {
      state.userListLoading = false
      state.userListSuccess = false
      state.userListFailed = true
    },

    postData: (state) => {
      state.postUserLoading = true
      state.postUserSuccess = false
      state.postUserFailed = false
    },
    postDataFulfilled: (state,action) => {
      state.postUserLoading = false
      state.postUserSuccess = true
      state.postUserData = action.payload
    },
    postDataFailed: (state) => {
      state.postUserLoading = false
      state.postUserSuccess = false
      state.postUserFailed = true
    },

    putData: (state) => {
      state.putUserLoading = true
      state.putUserSuccess = false
      state.putUserFailed = false
    },
    putDataFulfilled: (state,action) => {
      state.putUserLoading = false
      state.putUserSuccess = true
      state.putUserData = action.payload
    },
    putDataFailed: (state) => {
      state.putUserLoading = false
      state.putUserSuccess = false
      state.putUserFailed = true
    },

    delData: (state) => {
      state.delUserLoading = true
      state.delUserSuccess = false
      state.delUserFailed = false
    },
    delDataFulfilled: (state,action) => {
      state.delUserLoading = false
      state.delUserSuccess = true
      state.delUserData = action.payload
    },
    delDataFailed: (state) => {
      state.delUserLoading = false
      state.delUserSuccess = false
      state.delUserFailed = true
    },
  },
})

export const { 
  getData, getDataFulfilled, getDataFailed, 
  postData, postDataFulfilled, postDataFailed,
  putData, putDataFulfilled, putDataFailed,
  delData, delDataFulfilled, delDataFailed,
  resetData,
} = userSlice.actions

export default userSlice.reducer