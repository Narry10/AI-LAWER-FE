import { all } from "redux-saga/effects";
import { rootAuthSaga } from "./auth/saga";
import { rootUserSaga } from "./user/saga";
import { siteWorkspaceSaga } from "./siteWorkspace/sagas";

export default function* rootSaga() {
  yield all([
    rootAuthSaga(),
    rootUserSaga(),
    siteWorkspaceSaga()
  ]);
}
