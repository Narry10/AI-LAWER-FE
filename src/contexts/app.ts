import { all } from "redux-saga/effects";
import { rootAuthSaga } from "./auth/saga";
import { rootQuestionSaga } from "./question/saga";

export default function* rootSaga() {
  yield all([rootAuthSaga(),rootQuestionSaga()]);
}
