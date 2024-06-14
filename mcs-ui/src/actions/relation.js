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
} from "../reducers/relationSlice.js";

export const getRelationListActions = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`relation`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const postRelationActions = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`relation`, data);
      dispatch(postDataFulfilled(response.data));
      console.log(data, "TEST DATA RELATION ADD");
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};

export const putRelationActions = (id, data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`relation/${id}`, data);
      console.log(data, "TEST DATA RELATION EDIT");
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const delRelationActions = (id) => {
  return async (dispatch) => {
    dispatch(delData());
    try {
      const response = await httpRequest.destroy(`relation/${id}`);
      dispatch(delDataFulfilled(response.data));
    } catch (error) {
      dispatch(delDataFailed());
    }
  };
};
