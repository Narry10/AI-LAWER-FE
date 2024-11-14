import { call, put } from "redux-saga/effects";
import OfficeService from "server/office";
import {
    OfficeDelete,
    OfficeDeleteSuccess
} from "../businessActions";

export function* handleBusinessDeleteSaga(action: OfficeDelete) {
  try {
    const { ref_id } = action.payload;
    yield call(OfficeService.deleteOffice, ref_id);
    yield put(OfficeDeleteSuccess());
  } catch (error) {
    console.error(error);
  }
}
