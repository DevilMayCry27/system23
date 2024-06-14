import * as httpRequest from "../utils/axios.js";
import {
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
} from "../reducers/beneficiariesSlice.js";

export const getBeneficiariesListAction = (PID) => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`beneficiaries/${PID}`);
      dispatch(getDataFulfilled(response.data));

      console.log(response.data, "API GET DATA");
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const postBeneficiariesAction = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`beneficiaries`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putBeneficiariesAction = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`beneficiaries/${id}`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delBeneficiariesAction = (BID) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`beneficiaries/${BID}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
