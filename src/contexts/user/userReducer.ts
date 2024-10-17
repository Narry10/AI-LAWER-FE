import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userTypes";
import { CommonError } from "contexts/types";
import { USER_FETCH_ME, USER_LOGOUT } from "./userConstants";
import { UserFetchMe } from "./userActions";

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
      });
  },
});

export const userReducer = userSlice.reducer;
