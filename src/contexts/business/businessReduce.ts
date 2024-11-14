import { createSlice } from "@reduxjs/toolkit";
import { OfficeState } from "./businessType";
import {
  CREATE_BUSINESS_REQUEST,
  CREATE_BUSINESS_SUCCESS,
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
} from "./businessConstants";
import {
  OfficeCreate,
  OfficeCreateSuccess,
  OfficeFetch,
  OfficeSusseess,
} from "./businessActions";

const initialState: OfficeState = {
  data: [],
  loading: false,
  error: undefined,
};

const OfficeSlice = createSlice({
  name: "Office",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FETCH_BUSINESS_REQUEST, (state, action: OfficeFetch) => {
      state.loading = true;
    });
    builder.addCase(FETCH_BUSINESS_SUCCESS, (state, action: OfficeSusseess) => {
      state.data = action.payload.sort((a, b) => a.priority - b.priority);;
      state.loading = false;
    });
    builder.addCase(CREATE_BUSINESS_REQUEST, (state, action: OfficeCreate) => {
      state.loading = true;
    });
    builder.addCase(
      CREATE_BUSINESS_SUCCESS,
      (state, action: OfficeCreateSuccess) => {
        state.loading = false;
      }
    );
  },
});

export const officeReducer = OfficeSlice.reducer;
