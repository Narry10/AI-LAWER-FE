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
  History,
  HistoryFetchPayload,
  HistoryRemoveDarftPatload,
} from "./historyType";

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

export interface HistoryPostSussess {
  type: typeof HISTORY_POST_SUCCESS;
  payload: string;
}

export interface HistoryRemoveDarftId {
  type: typeof HISTORY_REMOVE_DRAFT_ID;
  payload: HistoryRemoveDarftPatload;
}

export interface HistoryError {
  type: typeof HISTORY_FETCH_ERROR;
  payload: string;
}

export interface HistoryDraftReset {
  type: typeof HISTOR_DRAFT_RESET;
}

export type historyAction =
  | HistoryFetch
  | HistoryPost
  | HistoryPostSussess
  | HistoryRemoveDarftId
  | HistoryDraftReset
  | HistoryError;

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

export const HistoryPostSussess = (payload: string): HistoryPostSussess => ({
  type: HISTORY_POST_SUCCESS,
  payload: payload,
});

export const historyRemoveDarftId = (
  payload: HistoryRemoveDarftPatload
): HistoryRemoveDarftId => ({
  type: HISTORY_REMOVE_DRAFT_ID,
  payload: payload,
});

export const historyError = (payload: string): HistoryError => ({
  type: HISTORY_FETCH_ERROR,
  payload: payload,
});

export const historyDraftReset = (): HistoryDraftReset => ({
  type: HISTOR_DRAFT_RESET,
});
