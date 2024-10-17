import { call, put } from "redux-saga/effects";
import AuthService from "server/auth";
import { AuthGoogleLogin, authLogged } from "../authActions";

export function* handleAuthSignUpWithGoogle(action: AuthGoogleLogin) {
  try {
    yield call(AuthService.signInWithGoogle);
    yield put(authLogged())
  } catch (error) {
    console.error(error);
  }
}