import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  getAuthorizePersonelData,
  getAuthorizePersonelDataFulfilled,
  getAuthorizePersonelDataFailed,
  postData,
  postDataFulfilled,
  postDataFailed,
  delData,
  delDataFulfilled,
  delDataFailed,
} from "../reducers/medicineapproverSlice.js";

export const getMedicineApproverAction = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`medicineapprover`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getAuthorizePersonelAction = () => {
  return async (dispatch) => {
    dispatch(getAuthorizePersonelData());
    try {
      const response = await httpRequest.get(`medicineapprover/personels`);
      dispatch(getAuthorizePersonelDataFulfilled(response.data));
    } catch (error) {
      dispatch(getAuthorizePersonelDataFailed());
    }
  };
};

export const postMedicineApproverAction = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`medicineapprover`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const delMedicineApproverActions = (ID) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`medicineapprover/${ID}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
