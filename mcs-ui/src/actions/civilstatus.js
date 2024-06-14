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
} from "../reducers/civilstatusSlice.js";

export const getCivilStatusListActions = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`civilstatus`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const postCivilStatusActions = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`civilstatus`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putCivilStatusActions = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`civilstatus/${id}`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delCivilStatusActions = (id) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`civilstatus/${id}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
