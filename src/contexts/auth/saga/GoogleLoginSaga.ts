import { call, put } from "redux-saga/effects";
import AuthService from "server/auth";

import { AuthGoogleLogin, authLogged } from "../authActions";
import UserService, { UserProfile } from "server/userService";

export function* handleAuthSignUpWithGoogle(action: AuthGoogleLogin) {
  try {
    // 1. Login Google (returns UserCredential)
    const userCredential = yield call(AuthService.signInWithGoogle);
    const { user } = userCredential || {};

    if (!user || !user.uid) {
      throw new Error("Google sign-in did not return a valid user.");
    }

    const uid: string = user.uid;

    // 2. Try to get existing user from Firestore via UserService
    let userProfile: UserProfile | null = yield call(UserService.getUser, uid);

    // 3. If not exists, create with default role/sites
    if (!userProfile) {
      const now = new Date().toISOString();
      const newUser: Partial<UserProfile> = {
        uid,
        email: user.email || null,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        role: "user",   // default role
        sites: [],      // default sites array
        createdAt: now,
        updatedAt: now,
      };

      yield call(UserService.createUser, newUser);

      // fetch again to get the created document (or just use newUser)
      userProfile = yield call(UserService.getUser, uid);
    }

    // 4. Dispatch logged action with user profile
    yield put(authLogged(userProfile));
  } catch (error) {
    console.error("Google login saga error:", error);
    // optionally you can dispatch an error action here, e.g.:
    // yield put(authLoginFailed(error));
  }
}
