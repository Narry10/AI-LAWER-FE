import { createSlice } from "@reduxjs/toolkit";
import { AuthDetailState } from "./authTypes";
import {
  AUTH_FETCH_EMAIL_LOGIN,
  AUTH_LOGGED,
  AUTH_LOGOUT,
} from "./authConstants";
import { authAction } from "./authActions";

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
