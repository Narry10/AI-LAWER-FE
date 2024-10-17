import { CommonError, CommonState } from "../types";

export interface IAuth {
  isLogin: boolean;
}

export interface AuthDetailState extends IAuth, CommonState {}

export interface authLogin {
  email: string;
  password: string;
}

export interface authSignUp extends authLogin{
	confirmPassword:string
}
