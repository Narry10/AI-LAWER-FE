import { all } from "redux-saga/effects";
import { rootAuthSaga } from "./auth/saga";

export default function* rootSaga() {
  yield all([
    rootAuthSaga(),
  ]);
}
