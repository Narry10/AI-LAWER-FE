import { CommonError, CommonState } from "../types";

export interface IUser {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}