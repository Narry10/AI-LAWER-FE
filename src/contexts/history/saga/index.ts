import { takeEvery } from "redux-saga/effects";
import { HISTORY_POST } from "../historyConstants";
import { handleHistoryPostSaga } from "./HistoryPostSaga";

export function* rootHistorySaga() {
  yield takeEvery(HISTORY_POST, handleHistoryPostSaga);
}
