import { call, put } from "redux-saga/effects";
import OfficeService from "server/office";
import {
    OfficeCreate,
    officeSussess
} from "../businessActions";

export function* handleBusinessFetchAllSaga(action: OfficeCreate) {
  try {
    const offices = yield call(OfficeService.getOffices);
    yield put(officeSussess(offices));
  } catch (error) {
    console.error(error);
  }
}
