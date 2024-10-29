import { createSlice } from "@reduxjs/toolkit";
import { HistoryState } from "./historyType";
import { HISTORY_FETCH_BY_UID, HISTORY_FETCH_BY_UID_SUSSESS, HISTORY_FETCH_ERROR } from "./historyConstants";
import { HistoryError, HistoryFetch, HistoryFetchSussess } from "./historyActions";

const initialState: HistoryState = {
  data: [],
  loading: false,
  error: undefined,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HISTORY_FETCH_BY_UID, (state, action: HistoryFetch) => {
      state.loading = true;
    })
    builder.addCase(HISTORY_FETCH_BY_UID_SUSSESS,(state,action:HistoryFetchSussess)=>{
      state.data = action.payload;
      state.loading = false;
    })
    builder.addCase(HISTORY_FETCH_ERROR,(state,action:HistoryError)=>{
      state.loading = false;
    })
  },
});

export const historyReducer = historySlice.reducer;
