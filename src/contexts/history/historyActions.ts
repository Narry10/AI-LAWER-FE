import {
  HISTORY_FETCH_BY_UID,
  HISTORY_FETCH_BY_UID_SUSSESS,
  HISTORY_FETCH_ERROR,
  HISTORY_POST,
} from "./historyConstants";
import { History, HistoryFetchPayload } from "./historyType";

export interface HistoryFetch {
  type: typeof HISTORY_FETCH_BY_UID;
  payload: HistoryFetchPayload;
}

export interface HistoryFetchSussess {
  type: typeof HISTORY_FETCH_BY_UID_SUSSESS;
  payload: History[];
}

export interface HistoryPost {
  type: typeof HISTORY_POST;
  payload: History;
}

export interface HistoryError {
  type: typeof HISTORY_FETCH_ERROR;
  payload: string;
}

export type historyAction = HistoryFetch | HistoryPost | HistoryError;

export const historyFetch = (payload: HistoryFetchPayload): HistoryFetch => ({
  type: HISTORY_FETCH_BY_UID,
  payload: payload,
});

export const HistoryFetchSussess = (
  payload: History[]
): HistoryFetchSussess => ({
  type: HISTORY_FETCH_BY_UID_SUSSESS,
  payload: payload,
});

export const historyPost = (payload: History): HistoryPost => ({
  type: HISTORY_POST,
  payload: payload,
});

export const historyError = (payload: string): HistoryError => ({
  type: HISTORY_FETCH_ERROR,
  payload: payload,
});