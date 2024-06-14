import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
} from "../reducers/medicalrecordSlice.js";

export const getMedicalRecordList = (MRID) => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`medicalrecord/${MRID}`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};
