import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  getUserLevelData,
  getUserLevelDataFulfilled,
  getUserLevelDataFailed,
  getapproveData,
  getapproveDataFulfilled,
  getapproveDataFailed,
  putApprovalData,
  putApprovalDataFulfilled,
  putApprovalDataFailed,
  putReleaseData,
  putReleaseDataFulfilled,
  putReleaseDataFailed,
  putRejectData,
  putRejectDataFulfilled,
  putRejectDataFailed,
} from "../reducers/medicinereleaseSlice.js";

export const getMedicineReleaseAction = (UL) => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`medicinerelease/${UL}`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getUserLevelAction = (AL) => {
  return async (dispatch) => {
    dispatch(getUserLevelData());
    try {
      const response = await httpRequest.get(`medicinerelease/userlevel/${AL}`);
      dispatch(getUserLevelDataFulfilled(response.data));
    } catch (error) {
      dispatch(getUserLevelDataFailed());
    }
  };
};

export const getMedicineApprovalListAction = (NorderID) => {
  return async (dispatch) => {
    dispatch(getapproveData());
    try {
      const response = await httpRequest.get(
        `medicinerelease/approval/${NorderID}`
      );
      dispatch(getapproveDataFulfilled(response.data));
    } catch (error) {
      dispatch(getapproveDataFailed());
    }
  };
};

export const putApprovalAction = (id, data) => {
  return async (dispatch) => {
    dispatch(putApprovalData());
    try {
      const response = await httpRequest.put(
        `medicinerelease/approval/${id}`,
        data
      );
      dispatch(putApprovalDataFulfilled(response.data));
    } catch (error) {
      dispatch(putApprovalDataFailed());
    }
  };
};

export const putReleaseAction = (id, data) => {
  return async (dispatch) => {
    dispatch(putReleaseData());
    try {
      const response = await httpRequest.put(
        `medicinerelease/release/${id}`,
        data
      );
      dispatch(putReleaseDataFulfilled(response.data));
    } catch (error) {
      dispatch(putReleaseDataFailed());
    }
  };
};

export const putRejectAction = (id, data) => {
  return async (dispatch) => {
    dispatch(putRejectData());
    try {
      const response = await httpRequest.put(
        `medicinerelease/reject/${id}`,
        data
      );
      dispatch(putRejectDataFulfilled(response.data));
    } catch (error) {
      dispatch(putRejectDataFailed());
    }
  };
};
