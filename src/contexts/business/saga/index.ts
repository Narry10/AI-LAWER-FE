import { takeEvery } from "redux-saga/effects";
import { handleBusinessCreateSaga } from "./BusinessCreateSaga";
import {
  CREATE_BUSINESS_REQUEST,
  DELETE_BUSINESS_REQUEST,
  FETCH_BUSINESS_REQUEST,
} from "../businessConstants";
import { handleBusinessFetchAllSaga } from "./BusinessFetchAllSaga";
import { handleBusinessDeleteSaga } from "./BusinessDeleteSaga";

export function* rootBusinessSaga() {
  yield takeEvery(CREATE_BUSINESS_REQUEST, handleBusinessCreateSaga);
  yield takeEvery(FETCH_BUSINESS_REQUEST, handleBusinessFetchAllSaga);
  yield takeEvery(DELETE_BUSINESS_REQUEST, handleBusinessDeleteSaga);
}
