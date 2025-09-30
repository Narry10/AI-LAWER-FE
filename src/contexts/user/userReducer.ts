import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserMeta } from "./userTypes";
import { CommonError } from "contexts/types";
import {
  USER_FETCH_ME,
  USER_LOGOUT,
  USER_META_FETCH_ERROR,
  USER_META_FETCH_SUCESS,
} from "./userConstants";
import { UserFetchMe, UserMetaFetchSuccess } from "./userActions";

interface UserState {
  data: IUser | null;
  loading: false;
  error: CommonError | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(USER_FETCH_ME, (state, action: UserFetchMe) => {
        state.data = action.payload;
      })
      .addCase(USER_LOGOUT, (state) => {
        state.data = null;
      })
      .addCase(
        USER_META_FETCH_SUCESS,
        (state, action: UserMetaFetchSuccess) => {
          const { role, sites } = action.payload;
          if (state.data) {
            state.data.role = role;
            state.data.sites = sites;
          }
        }
      )
      .addCase(USER_META_FETCH_ERROR, (state, action) => {
        state.error = {
          code: "500",
          message: "meta have prolems",
        };
      });
  },
});

export const userReducer = userSlice.reducer;
