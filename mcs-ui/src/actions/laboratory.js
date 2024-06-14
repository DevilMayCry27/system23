import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  getlaboratoryData,
  getlaboratoryDataFulfilled,
  getlaboratoryDataFailed,
  postlaboratoryPicData,
  postlaboratoryPicDataFulfilled,
  postlaboratoryPicFailed,
} from "../reducers/laboratorySlice.js";

export const getEmployeeListAction = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`laboratory`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getLaboratoryListAction = (LABid) => {
  return async (dispatch) => {
    dispatch(getlaboratoryData());
    try {
      const response = await httpRequest.get(`laboratory/records/${LABid}`);
      dispatch(getlaboratoryDataFulfilled(response.data));
    } catch (error) {
      dispatch(getlaboratoryDataFailed());
    }
  };
};

export const postLaboratoryPicAction = (data) => {
  return async (dispatch) => {
    dispatch(postlaboratoryPicData());
    try {
      const response = await httpRequest.postMultiForm(
        `laboratory/upload-laboratoryphoto`,
        data
      );
      dispatch(postlaboratoryPicDataFulfilled(response.data));
    } catch (error) {
      dispatch(postlaboratoryPicFailed());
    }
  };
};
