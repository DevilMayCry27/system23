import * as httpRequest from "../utils/axios.js";
import { setItem } from "../utils/storage.js";
import {
  getData,
  getDataFulfilled,
  getDataFailed,
} from "../reducers/loginSlice.js";

export const login = (credential) => {
  return async (dispatch) => {
    dispatch(getData());
    try {
      const response = await httpRequest.post(`auth/login`, credential, false);
      setItem("hcp-app", response.data);
      dispatch(getDataFulfilled(response.data));
    } catch (error) {
      dispatch(getDataFailed());
    }
  };
};
