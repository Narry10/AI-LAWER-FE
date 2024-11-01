import { call, put } from "redux-saga/effects";
import historyService from "server/history";
import {
  HistoryFetch,
  HistoryFetchSussess
} from "../historyActions";

export function* handleHistoryFetchbyUidSaga(action: HistoryFetch) {
  try {
    const { uid } = action.payload;
    const historys = yield call(historyService.getHistoryByUid, uid);
    yield put(HistoryFetchSussess(historys));
  } catch (error) {
    console.error(error);
  }
}
