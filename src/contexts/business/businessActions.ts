import { CREATE_BUSINESS_REQUEST, CREATE_BUSINESS_SUCCESS, DELETE_BUSINESS_REQUEST, DELETE_BUSINESS_SUCCESS, FETCH_BUSINESS_REQUEST, FETCH_BUSINESS_SUCCESS } from "./businessConstants";
import { Office, OfficeDeletePayload } from "./businessType";

export interface OfficeFetch {
  type: typeof FETCH_BUSINESS_REQUEST;
}

export interface OfficeSusseess {
  type: typeof FETCH_BUSINESS_SUCCESS;
  payload: Office[];
}


export interface OfficeCreate {
  type: typeof CREATE_BUSINESS_REQUEST;
  payload: Office;
}

export interface OfficeCreateSuccess {
  type: typeof CREATE_BUSINESS_SUCCESS;
}

export interface OfficeDelete {
  type: typeof DELETE_BUSINESS_REQUEST;
  payload: OfficeDeletePayload
}

export interface OfficeDeleteSuccess {
  type: typeof DELETE_BUSINESS_SUCCESS;
}

export type OfficeAction = OfficeFetch;

export const officeFetch = (): OfficeFetch => ({
  type: FETCH_BUSINESS_REQUEST,
});

export const officeSussess = (payload: Office[]): OfficeSusseess => ({
  type: FETCH_BUSINESS_SUCCESS,
  payload: payload,
});

export const officeCreate = (payload: Office): OfficeCreate => ({
  type: CREATE_BUSINESS_REQUEST,
  payload: payload,
});

export const officeCreateSuccess = (): OfficeCreateSuccess => ({
  type: CREATE_BUSINESS_SUCCESS,
});

export const officeDelete = (payload: OfficeDeletePayload): OfficeDelete => ({
  type: DELETE_BUSINESS_REQUEST,
  payload: payload
});

export const OfficeDeleteSuccess = (): OfficeDeleteSuccess => ({
  type: DELETE_BUSINESS_SUCCESS,
});