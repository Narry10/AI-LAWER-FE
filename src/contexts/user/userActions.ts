import {
  USER_FETCH_ME,
  USER_LOGOUT,
  USER_META_FETCH_ERROR,
  USER_META_FETCH_SUCESS,
  USER_META_FETCHING,
} from "./userConstants";
import { IUser, IUserMeta } from "./userTypes";

export interface UserFetchMe {
  type: typeof USER_FETCH_ME;
  payload: IUser;
}

export interface UserLogOut {
  type: typeof USER_LOGOUT;
}

export interface UserMetaFetching {
  type: typeof USER_META_FETCHING;
  payload: {
    uid: string;
  }
}

export interface UserMetaFetchSuccess {
  type: typeof USER_META_FETCH_SUCESS;
  payload: IUserMeta;
}

export interface UserMetaFetchError {
  type: typeof USER_META_FETCH_ERROR;
  payload: string;
}

export type userAction =
  | UserFetchMe
  | UserLogOut
  | UserMetaFetching
  | UserMetaFetchSuccess
  | UserMetaFetchError;

export const userFetchMe = (payload: IUser): UserFetchMe => ({
  type: USER_FETCH_ME,
  payload,
});

export const userLogOut = (): UserLogOut => ({
  type: USER_LOGOUT,
});

export const userMetaFetching = (uid: string): UserMetaFetching => ({
  type: USER_META_FETCHING,
  payload: {
    uid,
  },
});

export const userMetaFetchSuccess = (
  payload: IUserMeta
): UserMetaFetchSuccess => ({
  type: USER_META_FETCH_SUCESS,
  payload,
});

export const userMetaFetchError = (payload: string): UserMetaFetchError => ({
  type: USER_META_FETCH_ERROR,
  payload,
});
