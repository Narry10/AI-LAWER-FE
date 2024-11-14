import { createSlice } from "@reduxjs/toolkit";
import { DocumentState } from "./documentType";
import {
  DOCUMENT_FETCH_BY_UID,
  DOCUMENT_FETCH_BY_UID_SUSSESS,
} from "./documentConstants";
import { DocumentFetch, DocumentFetchSussess } from "./documentActions";

const initialState: DocumentState = {
  data: null,
  loading: false,
  error: undefined,
};

const DocumentSlice = createSlice({
  name: "Document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DOCUMENT_FETCH_BY_UID, (state, action: DocumentFetch) => {
      state.loading = true;
    });
    builder.addCase(
      DOCUMENT_FETCH_BY_UID_SUSSESS,
      (state, action: DocumentFetchSussess) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
  },
});

export const documentReducer = DocumentSlice.reducer;
