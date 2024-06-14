import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  trailListLoading: false,
  trailListSuccess: false,
  trailListFailed: false,
  trailListData: []
}

export const trailSlice = createSlice({
  name: 'trail',
  initialState,
  reducers: {
    resetData: (state) => {
      state.trailListLoading = false
      state.trailListSuccess = false
      state.trailListFailed = false
      state.trailListData = []
    },
    getData: (state) => {
      state.trailListLoading = true
      state.trailListSuccess = false
      state.trailListFailed = false
    },
    getDataFulfilled: (state,action) => {
      state.trailListLoading = false
      state.trailListSuccess = true
      state.trailListData = action.payload
    },
    getDataFailed: (state) => {
      state.trailListLoading = false
      state.trailListSuccess = false
      state.trailListFailed = true
    },
  },
})

export const { getData, getDataFulfilled, getDataFailed, resetData } = trailSlice.actions

export default trailSlice.reducer