import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  getApeData,
  getApeDataFulfilled,
  getApeDataFailed,
  postApePicData,
  postApePicDataFulfilled,
  postApePicFailed,
} from "../reducers/apeSlice.js";

export const getEmployeeListAction = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`ape`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getApeListAction = (APEid) => {
  return async (dispatch) => {
    dispatch(getApeData());
    try {
      const response = await httpRequest.get(`ape/records/${APEid}`);
      dispatch(getApeDataFulfilled(response.data));
    } catch (error) {
      dispatch(getApeDataFailed());
    }
  };
};

export const postApePicAction = (data) => {
  return async (dispatch) => {
    dispatch(postApePicData());
    try {
      const response = await httpRequest.postMultiForm(
        `ape/upload-apephoto`,
        data
      );
      dispatch(postApePicDataFulfilled(response.data));
    } catch (error) {
      dispatch(postApePicFailed());
    }
  };
};
