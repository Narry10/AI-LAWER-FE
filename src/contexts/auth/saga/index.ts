import { takeEvery } from "redux-saga/effects";

import {
  AUTH_FETCH_EMAIL_LOGIN,
  AUTH_FETCH_GOOGLE_LOGIN,
  AUTH_LOGOUT
} from "../authConstants";
import { handleAuthLoginWithEmail } from "./EmailLoginSaga";
import { handleAuthSignUpWithGoogle } from "./GoogleLoginSaga";
import { handleAuthLogout } from "./UserLogoutSaga";

export function* rootAuthSaga() {
  yield takeEvery(AUTH_FETCH_EMAIL_LOGIN, handleAuthLoginWithEmail);
  yield takeEvery(AUTH_FETCH_GOOGLE_LOGIN, handleAuthSignUpWithGoogle);
  yield takeEvery(AUTH_LOGOUT, handleAuthLogout);
}
