import { call } from "redux-saga/effects";
import historyService from "server/history";
import { HistoryRemoveDarftId } from "../historyActions";


export function* handleHistoryRemoveDraftSaga(action: HistoryRemoveDarftId) {
  try {
    const { draftId } = action.payload;

    yield call(historyService.deleteHistoryByRefId, draftId);
  } catch (error) {
    console.error(error);
  }
}
