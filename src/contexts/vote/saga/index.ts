import { takeEvery } from "redux-saga/effects";
import { VotePostProductSaga } from "./VotePostProductSaga";
import { VOTE_POST_PRODUCT } from "../voteConstants";

export function* rootVoteSaga() {
    yield takeEvery(VOTE_POST_PRODUCT, VotePostProductSaga);
}
