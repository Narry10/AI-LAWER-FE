import { call, put } from "redux-saga/effects";
import OfficeService from "server/office";
import { OfficeCreate, officeCreateSuccess } from "../businessActions";

export function* handleBusinessCreateSaga(action: OfficeCreate) {
  try {
    yield call(OfficeService.createOffice, action.payload);
    yield put(officeCreateSuccess());
  } catch (error) {
    console.error(error);
  }
}
