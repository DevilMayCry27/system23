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
} from "../reducers/regionSlice.js";

export const getRegionListAction = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`region`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getFilteredRegionListAction = (RNo) => {
  return async (dispatch) => {
    dispatch(getFilteredData());
    try {
      const response = await httpRequest.get(`region/filtered/${RNo}`);
      dispatch(getFilteredDataFulfilled(response.data));
    } catch (error) {
      dispatch(getFilteredDataFailed());
    }
  };
};

export const getRegionDuplicateAction = (name) => {
  return async (dispatch) => {
    dispatch(getDuplicateData());
    try {
      const response = await httpRequest.get(`region/regionname/${name}`);
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

export const postRegionAction = (data) => {
  console.log(data, "TEST CONS");
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`region`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putRegionAction = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`region/${id}`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delRegionAction = (id) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`region/${id}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
