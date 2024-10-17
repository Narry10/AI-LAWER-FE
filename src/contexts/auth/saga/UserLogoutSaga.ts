import { userLogOut } from "contexts/user";
import { call, put } from "redux-saga/effects";
import AuthService from "server/auth";
import { AuthLogout } from "../authActions";

export function* handleAuthLogout(action: AuthLogout) {
  try {
    yield call(AuthService.signOut);
    yield put(userLogOut());
  } catch (error) {
    console.error(error);
  }
}
