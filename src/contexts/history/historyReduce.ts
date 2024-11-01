import { createSlice } from "@reduxjs/toolkit";
import { HistoryState } from "./historyType";
import {
  HISTOR_DRAFT_RESET,
  HISTORY_FETCH_BY_UID,
  HISTORY_FETCH_BY_UID_SUSSESS,
  HISTORY_FETCH_ERROR,
  HISTORY_POST,
  HISTORY_POST_SUCCESS,
  HISTORY_REMOVE_DRAFT_ID,
} from "./historyConstants";
import {
  HistoryError,
  HistoryFetch,
  HistoryFetchSussess,
  HistoryPost,
  HistoryPostSussess,
  HistoryRemoveDarftId,
} from "./historyActions";

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
    });
    builder.addCase(
      HISTORY_FETCH_BY_UID_SUSSESS,
      (state, action: HistoryFetchSussess) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(HISTORY_FETCH_ERROR, (state, action: HistoryError) => {
      state.loading = false;
    });
    builder.addCase(HISTORY_POST, (state, action: HistoryPost) => {
      state.loading = true;
    });
    builder.addCase(
      HISTORY_POST_SUCCESS,
      (state, action: HistoryPostSussess) => {
        state.draftId = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      HISTORY_REMOVE_DRAFT_ID,
      (state, action: HistoryRemoveDarftId) => {
        state.draftId = undefined;
        state.loading = false;
      }
    );
    builder.addCase(HISTOR_DRAFT_RESET, (state) => {
      state.draftId = undefined;
    });
  },
});

export const historyReducer = historySlice.reducer;
