import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
  getItemsData,
  getItemsDataFulfilled,
  getItemsDataFailed,
  getTypeData,
  getTypeDataFulfilled,
  getTypeDataFailed,
} from "../reducers/medicinesalesreportSlice.js";

export const getMedicineSaleReportList = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`medicinesalesreport`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const getMedicineSalesItems = () => {
  return async (dispatch) => {
    dispatch(getItemsData());
    try {
      const response = await httpRequest.get(`medicinesalesreport/item`);
      dispatch(getItemsDataFulfilled(response.data));
    } catch (error) {
      dispatch(getItemsDataFailed());
    }
  };
};

export const getMedicineSalesType = () => {
  return async (dispatch) => {
    dispatch(getTypeData());
    try {
      const response = await httpRequest.get(`medicinesalesreport/type`);
      dispatch(getTypeDataFulfilled(response.data));
    } catch (error) {
      dispatch(getTypeDataFailed());
    }
  };
};
