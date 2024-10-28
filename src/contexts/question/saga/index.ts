import { takeEvery } from "redux-saga/effects";
import { QUESTION_FETCH_RESULT } from "../questionConstants";
import { handleFetchQuestionSaga } from "./QuestionFetchSaga";

export function* rootQuestionSaga() {
  yield takeEvery(QUESTION_FETCH_RESULT, handleFetchQuestionSaga);
}
