import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  putPassChangeData,
  putPassChangeDataFulfilled,
  putPassChangeDataFailed,
  putData,
  putDataFulfilled,
  putDataFailed,
  putProfilePicData,
  putProfilePicDataFulfilled,
  putProfilePicFailed,
} from "../reducers/profileSlice.js";

export const getCurrentUserProfileList = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`profile`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const putProfilePic = (data) => {
  return async (dispatch) => {
    dispatch(putProfilePicData());
    try {
      const response = await httpRequest.postMultiForm(
        `profile/upload-photo`,
        data
      );
      dispatch(putProfilePicDataFulfilled(response.data));
    } catch (error) {
      dispatch(putProfilePicFailed());
    }
  };
};

export const putProfile = (data) => {
  return async (dispatch) => {
    dispatch(putData());
    try {
      const response = await httpRequest.put(`profile/update-info`, data);
      dispatch(putDataFulfilled(response.data));
    } catch (error) {
      dispatch(putDataFailed());
    }
  };
};

export const putChangePassword = (data) => {
  return async (dispatch) => {
    dispatch(putPassChangeData());
    try {
      const response = await httpRequest.put(`profile/change-pass`, data);
      dispatch(putPassChangeDataFulfilled(response.data));
    } catch (error) {
      dispatch(putPassChangeDataFailed());
    }
  };
};
