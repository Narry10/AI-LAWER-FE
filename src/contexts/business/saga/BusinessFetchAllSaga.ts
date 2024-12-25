import { call, put } from "redux-saga/effects";
import OfficeService from "server/office";
import {
    OfficeCreate,
    officeSussess
} from "../businessActions";

export function* handleBusinessFetchAllSaga(action: OfficeCreate) {
  try {
    const offices = yield call(OfficeService.getOffices);
    console.log(offices);
    
    yield put(officeSussess(offices));
  } catch (error) {
    console.error(error);
  }
}
