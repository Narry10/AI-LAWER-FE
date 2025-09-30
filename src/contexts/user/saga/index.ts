
import { takeEvery } from "redux-saga/effects";
import { USER_META_FETCHING } from "../userConstants";
import { UserMetaFetchSaga } from "./UserMetaFetchSaga";

export function* rootUserSaga() {
    yield takeEvery(USER_META_FETCHING, UserMetaFetchSaga);
}
