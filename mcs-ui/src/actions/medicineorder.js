import * as httpRequest from "../utils/axios.js";
import {
  getnumberData,
  getnumberDataFulfilled,
  getnumberDataFailed,
  getallData,
  getallDataFulfilled,
  getallDataFailed,
  getData,
  getDataFulfilled,
  getDataFailed,
  postData,
  postDataFulfilled,
  postDataFailed,
} from "../reducers/medicineorderSlice.js";

export const getOrderNumberAction = () => {
  return async (dispatch) => {
    dispatch(getnumberData());
    try {
      const response = await httpRequest.get(`medicineorder/orderid`);
      dispatch(getnumberDataFulfilled(response.data));
    } catch (error) {
      dispatch(getnumberDataFailed());
    }
  };
};

export const getAllMedicineOrderListAction = () => {
  return async (dispatch) => {
    dispatch(getallData());
    try {
      const response = await httpRequest.get(`medicineorder`);
      dispatch(getallDataFulfilled(response.data));
    } catch (error) {
      dispatch(getallDataFailed());
    }
  };
};

export const getMedicineOrderListAction = (MorderId) => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`medicineorder/${MorderId}`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};

export const postMedicineOrderListAction = (data) => {
  return async (dispatch) => {
    dispatch(postData());
    try {
      const response = await httpRequest.post(`medicineorder`, data);
      dispatch(postDataFulfilled(response.data));
    } catch (error) {
      dispatch(postDataFailed());
    }
  };
};
