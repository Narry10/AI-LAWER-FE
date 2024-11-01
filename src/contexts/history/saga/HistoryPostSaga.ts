import { call, put } from "redux-saga/effects";
import historyService from "server/history";
import { HistoryPost, HistoryPostSussess } from "../historyActions";

export function* handleHistoryPostSaga(action: HistoryPost) {
  try {
    const { answer, caseType, fullName, gender, phone, question, uid } =
      action.payload;
    const newHistory = {
      answer: answer,
      caseType: caseType,
      create_at: new Date(),
      fullName: fullName,
      gender: gender,
      phone: phone,
      question: question,
      uid: uid,
    };

    const createdHistory = yield call(historyService.createHistory, newHistory);
    yield put(HistoryPostSussess(createdHistory?.ref_id));
  } catch (error) {
    console.error(error);
  }
}
