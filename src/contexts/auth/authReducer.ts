import { createSlice } from "@reduxjs/toolkit";
import {
  AUTH_LOGGED,
  AUTH_LOGOUT
} from "./authConstants";
import { AuthDetailState } from "./authTypes";

const initialState: AuthDetailState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AUTH_LOGGED, (state, action) => {
        state.isLogin = true;
      })
      .addCase(AUTH_LOGOUT, (state, action) => {
        state.isLogin = false;
      });
  },
});

export const authReducer = authSlice.reducer;
