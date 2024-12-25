import {
  DOCUMENT_FETCH_BY_UID,
  DOCUMENT_FETCH_BY_UID_SUSSESS,
} from "./documentConstants";
import { Document, DocumentFetchPayload } from "./documentType";

export interface DocumentFetch {
  type: typeof DOCUMENT_FETCH_BY_UID;
  payload: DocumentFetchPayload;
}

export interface DocumentFetchSussess {
  type: typeof DOCUMENT_FETCH_BY_UID_SUSSESS;
  payload: Document;
}

export type DocumentAction = DocumentFetch | DocumentFetchSussess;

export const documentFetch = (
  payload: DocumentFetchPayload
): DocumentFetch => ({
  type: DOCUMENT_FETCH_BY_UID,
  payload: payload,
});

export const documentFetchSussess = (
  payload: Document
): DocumentFetchSussess => ({
  type: DOCUMENT_FETCH_BY_UID_SUSSESS,
  payload: payload,
});
