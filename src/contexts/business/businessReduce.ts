import { createSlice } from "@reduxjs/toolkit";
import { ClientOfficeState, OfficeState } from "./businessType";
import {
  CREATE_BUSINESS_REQUEST,
  CREATE_BUSINESS_SUCCESS,
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
  FETCH_CLIENT_BUSINESS_REQUEST,
  FETCH_CLIENT_BUSINESS_SUCCESS,
} from "./businessConstants";
import {
  OfficeClientFetch,
  OfficeClientSusseess,
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
      state.data = action.payload.sort((a, b) => a.priority - b.priority);
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

const initialClientState: ClientOfficeState = {
  data: null,
  loading: false,
  error: undefined,
};

const ClientOfficeSlice = createSlice({
  name: "ClientOffice",
  initialState: initialClientState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      FETCH_CLIENT_BUSINESS_REQUEST,
      (state, action: OfficeClientFetch) => {
        state.loading = true;
      }
    );
    builder.addCase(
      FETCH_CLIENT_BUSINESS_SUCCESS,
      (state, action: OfficeClientSusseess) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
  },
});

export const clientOfficeReducer = ClientOfficeSlice.reducer;
