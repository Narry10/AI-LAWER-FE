import { all, call } from "redux-saga/effects";
import { rootAuthSaga } from "./auth/saga";
import { rootVoteSaga } from "./vote/saga";

export default function* rootSaga() {
  yield all([rootAuthSaga(),rootVoteSaga()]);
}
