import { takeEvery } from "redux-saga/effects";
import { HISTORY_FETCH_BY_UID, HISTORY_POST, HISTORY_REMOVE_DRAFT_ID } from "../historyConstants";
import { handleHistoryPostSaga } from "./HistoryPostSaga";
import { handleHistoryRemoveDraftSaga } from "./HistoryRemoveDraftSaga";
import { handleHistoryFetchbyUidSaga } from "./HistoryFetchbyUidSaga";

export function* rootHistorySaga() {
  yield takeEvery(HISTORY_FETCH_BY_UID, handleHistoryFetchbyUidSaga);
  yield takeEvery(HISTORY_POST, handleHistoryPostSaga);
  yield takeEvery(HISTORY_REMOVE_DRAFT_ID, handleHistoryRemoveDraftSaga);
}
