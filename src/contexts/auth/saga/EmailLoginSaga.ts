import { call } from "redux-saga/effects";
import { AuthLoginWithEmail } from "../authActions";
import AuthService from "server/auth";

export function* handleAuthLoginWithEmail(action: AuthLoginWithEmail) {
  try {
    const { email, password } = action.payload;
    const user =  yield call(AuthService.signInWithEmailAndPassword, {
      email: email,
      password: password,
    }); 
  } catch (error) {
    console.error(error);
  }
}
