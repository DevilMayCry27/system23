import { createSlice } from "@reduxjs/toolkit";
import { APP_NAME } from "../../utils/constant";
import { setItem, getItem } from '../../utils/storage'

const initialState = {
  activeApp: getItem("activeApp") || APP_NAME.DASHBOARD,
};

export const switchAppSlice = createSlice({
  name: "switchApp",
  initialState,
  reducers: {
    onSwitchApp: (state, action) => {
      state.activeApp = action.payload;
      setItem("activeApp", action.payload);
    },
    onExitApp: (state, action) => {
      state.activeApp = APP_NAME.DASHBOARD;
      setItem("activeApp", APP_NAME.DASHBOARD);
    },
  },
});

export const { onSwitchApp, onExitApp } = switchAppSlice.actions;

export default switchAppSlice.reducer;
