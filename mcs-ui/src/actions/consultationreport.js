import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  getIllnessData,
  getIllnessDataFulfilled,
  getIllnessDataFailed,
  getDepartmentData,
  getDepartmentDataFulfilled,
  getDepartmentDataFailed,
} from "../reducers/consultationreportSlice.js";

export const getConsultationReportList = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`consultationreport`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getConsultationReportIllness = () => {
  return async (dispatch) => {
    dispatch(getIllnessData());
    try {
      const response = await httpRequest.get(`consultationreport/illness`);
      dispatch(getIllnessDataFulfilled(response.data));
    } catch (error) {
      dispatch(getIllnessDataFailed());
    }
  };
};

export const getDepartmentReportIllness = () => {
  return async (dispatch) => {
    dispatch(getDepartmentData());
    try {
      const response = await httpRequest.get(`consultationreport/department`);
      dispatch(getDepartmentDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDepartmentDataFailed());
    }
  };
};
