import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
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
} from "../reducers/countrySlice.js";

export const getCountryList = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`country`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getCountryDuplicateAction = (name) => {
  return async (dispatch) => {
    dispatch(getDuplicateData());
    try {
      const response = await httpRequest.get(`country/countryname/${name}`);
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

export const postCountry = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`country`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putCountry = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`country/${id}`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delCountry = (id) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`country/${id}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
