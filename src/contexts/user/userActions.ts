import { USER_FETCH_ME, USER_LOGOUT } from "./userConstants";
import { IUser } from "./userTypes";

export interface UserFetchMe {
  type: typeof USER_FETCH_ME;
  payload: IUser;
}

export interface UserLogOut {
  type: typeof USER_LOGOUT;
}
export type userAction = UserFetchMe;

export const userFetchMe = (payload: IUser): UserFetchMe => ({
  type: USER_FETCH_ME,
  payload,
});

export const userLogOut = (): UserLogOut => ({
  type: USER_LOGOUT,
});
