import { call, put } from "redux-saga/effects";
import OfficeService from "server/office";
import { OfficeClientFetch, officeClientSussess } from "../businessActions";

export function* handleClientBusinessFetchAllSaga(action: OfficeClientFetch) {
  try {
    const { ref_id } = action.payload;
    const offices = yield call(OfficeService.getOfficeById, ref_id);
    yield put(officeClientSussess(offices));
  } catch (error) {
    console.error(error);
  }
}
