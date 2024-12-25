import { all } from "redux-saga/effects";
import { rootAuthSaga } from "./auth/saga";
import { rootQuestionSaga } from "./question/saga";
import { rootHistorySaga } from "./history/saga";
import { rootdocumentSaga } from "./document/saga";
import { rootBusinessSaga } from "./business/saga";

export default function* rootSaga() {
  yield all([
    rootAuthSaga(),
    rootQuestionSaga(),
    rootHistorySaga(),
    rootdocumentSaga(),
    rootBusinessSaga()
  ]);
}
