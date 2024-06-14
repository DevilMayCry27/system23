import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  medicineListLoading: false,
  medicineListSuccess: false,
  medicineListFailed: false,
  medicineListData: [],

  postMedicineLoading: false,
  postMedicineSuccess: false,
  postMedicineFailed: false,
  postMedicineData: [],

  putMedicineLoading: false,
  putMedicineSuccess: false,
  putMedicineFailed: false,
  putMedicineData: [],

  delMedicineLoading: false,
  delMedicineSuccess: false,
  delMedicineFailed: false,
  delMedicineData: [],
}

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    resetData: (state) => {
      state.medicineListLoading = false
      state.medicineListSuccess = false
      state.medicineListFailed = false
      state.medicineListData = []
      state.postMedicineLoading = false
      state.postMedicineSuccess = false
      state.postMedicineFailed = false
      state.postMedicineData = []
      state.putMedicineLoading = false
      state.putMedicineSuccess = false
      state.putMedicineFailed = false
      state.putMedicineData = []
      state.delMedicineLoading = false
      state.delMedicineSuccess = false
      state.delMedicineFailed = false
      state.delMedicineData = []
    },
    getData: (state) => {
      state.medicineListLoading = true
      state.medicineListSuccess = false
      state.medicineListFailed = false
    },
    getDataFulfilled: (state,action) => {
      state.medicineListLoading = false
      state.medicineListSuccess = true
      state.medicineListData = action.payload
    },
    getDataFailed: (state) => {
      state.medicineListLoading = false
      state.medicineListSuccess = false
      state.medicineListFailed = true
    },

    postData: (state) => {
      state.postMedicineLoading = true
      state.postMedicineSuccess = false
      state.postMedicineFailed = false
    },
    postDataFulfilled: (state,action) => {
      state.postMedicineLoading = false
      state.postMedicineSuccess = true
      state.postMedicineData = action.payload
    },
    postDataFailed: (state) => {
      state.postMedicineLoading = false
      state.postMedicineSuccess = false
      state.postMedicineFailed = true
    },

    putData: (state) => {
      state.putMedicineLoading = true
      state.putMedicineSuccess = false
      state.putMedicineFailed = false
    },
    putDataFulfilled: (state,action) => {
      state.putMedicineLoading = false
      state.putMedicineSuccess = true
      state.putMedicineData = action.payload
    },
    putDataFailed: (state) => {
      state.putMedicineLoading = false
      state.putMedicineSuccess = false
      state.putMedicineFailed = true
    },

    delData: (state) => {
      state.delMedicineLoading = true
      state.delMedicineSuccess = false
      state.delMedicineFailed = false
    },
    delDataFulfilled: (state,action) => {
      state.delMedicineLoading = false
      state.delMedicineSuccess = true
      state.delMedicineData = action.payload
    },
    delDataFailed: (state) => {
      state.delMedicineLoading = false
      state.delMedicineSuccess = false
      state.delMedicineFailed = true
    },
  },
})

export const { 
  getData, getDataFulfilled, getDataFailed, 
  postData, postDataFulfilled, postDataFailed,
  putData, putDataFulfilled, putDataFailed,
  delData, delDataFulfilled, delDataFailed,
  resetData,
} = medicineSlice.actions

export default medicineSlice.reducer