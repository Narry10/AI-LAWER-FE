import { call } from "redux-saga/effects";
import { AuthSinUpWithEmail } from "../authActions";
import AuthService from "server/auth";
import { UserCredential } from "firebase/auth";

export function* handleAuthSignUpWithEmail(action: AuthSinUpWithEmail) {
  try {
    const { email, password } = action.payload;
    yield call(
      AuthService.signUpWithEmailAndPassword,
      {
        email: email,
        password: password,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
