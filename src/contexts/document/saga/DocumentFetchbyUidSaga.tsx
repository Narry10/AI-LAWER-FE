import { call, put } from "redux-saga/effects";
import historyService from "server/history";
import { DocumentFetch, documentFetchSussess } from "../documentActions";

export function* handleDocumentFetchbyUidSaga(action: DocumentFetch) {
  try {
    const { ref_id } = action.payload;
    const historys = yield call(historyService.getHistoryByRefId, ref_id);
    yield put(documentFetchSussess(historys));
  } catch (error) {
    console.error(error);
  }
}
