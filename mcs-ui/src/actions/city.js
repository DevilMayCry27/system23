import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  getFilteredData,
  getFilteredDataFulfilled,
  getFilteredDataFailed,
  getDuplicateData,
  getDuplicateDataFulfilled,
  getDuplicateDataFailed,
  postData,
  postDataFulfilled,
  postDataFailed,
  putData,
  putDataFulfilled,
  putDataFailed,
  delData,
  delDataFulfilled,
  delDataFailed,
} from "../reducers/citySlice.js";

export const getCityListAction = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`city`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getFilteredCityListAction = (CNo) => {
  return async (dispatch) => {
    dispatch(getFilteredData());
    try {
      const response = await httpRequest.get(`city/filtered/${CNo}`);
      dispatch(getFilteredDataFulfilled(response.data));
    } catch (error) {
      dispatch(getFilteredDataFailed());
    }
  };
};

export const getCityDuplicateAction = (name) => {
  return async (dispatch) => {
    dispatch(getDuplicateData());
    try {
      const response = await httpRequest.get(`city/cityname/${name}`);
      if (response.data.length > 0) {
        dispatch(getDuplicateDataFailed(response.data));
      } else {
        dispatch(getDuplicateDataFulfilled(response.data));
      }
    } catch (error) {
      dispatch(getDuplicateDataFailed());
    }
  };
};

export const postCityAction = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`city`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putCityAction = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`city/${id}`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delCityAction = (id) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`city/${id}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
