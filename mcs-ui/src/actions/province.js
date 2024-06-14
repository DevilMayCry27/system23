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
} from "../reducers/provinceSlice.js";

export const getProvinceListAction = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`province`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getFilteredProvinceListAction = (PNo) => {
  return async (dispatch) => {
    dispatch(getFilteredData());
    try {
      const response = await httpRequest.get(`province/filtered/${PNo}`);
      dispatch(getFilteredDataFulfilled(response.data));
    } catch (error) {
      dispatch(getFilteredDataFailed());
    }
  };
};

export const getProvinceDuplicateAction = (name) => {
  return async (dispatch) => {
    dispatch(getDuplicateData());
    try {
      const response = await httpRequest.get(`province/provincename/${name}`);
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

export const postProvinceAction = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`province`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putProvinceAction = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`province/${id}`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delProvinceAction = (id) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`province/${id}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
