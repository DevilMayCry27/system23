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
} from "../reducers/genderSlice.js";

export const getGenderList = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`gender`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const postGender = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`gender`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putGender = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`gender/${id}`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delGender = (id) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`gender/${id}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
