import { takeEvery } from "redux-saga/effects";
import { DOCUMENT_FETCH_BY_UID } from "../documentConstants";
import { handleDocumentFetchbyUidSaga } from "./DocumentFetchbyUidSaga";

export function* rootdocumentSaga() {
  yield takeEvery(DOCUMENT_FETCH_BY_UID, handleDocumentFetchbyUidSaga);
}
