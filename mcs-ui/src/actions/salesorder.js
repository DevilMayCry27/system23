import * as httpRequest from "../utils/axios.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
} from "../reducers/salesorderSlice.js";

export const getSalesOrderListAction = () => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.get(`salesorder`);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};
