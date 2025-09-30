import { call, put } from "redux-saga/effects";
import UserService from "server/userService";
import { IUserMeta } from "../userTypes";
import {
  userMetaFetchError,
  UserMetaFetching,
  userMetaFetchSuccess,
} from "../userActions";

export function* UserMetaFetchSaga(action: UserMetaFetching) {
  try {
    const meta: IUserMeta | null = yield call(
      UserService.getUserRoleAndSites,
      action.payload.uid
    );
    if (meta) {
      yield put(userMetaFetchSuccess(meta));
    }
  } catch (error) {
    yield put(userMetaFetchError("Failed to fetch user meta"));
  }
}
