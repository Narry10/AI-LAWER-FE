import { addDoc } from "firebase/firestore";
import { call } from "redux-saga/effects";
import { VotePostProduct } from "../voteActions";
import { UserVoteService } from "server/vote";
import { VotePostProductPayload } from "../voteTypes";

export function* VotePostProductSaga(action: VotePostProduct) {
  try {
    const { email, id, votedProducts } = action.payload;
    yield call(
      UserVoteService.addUserVote,
      {
        email: email,
        votedProducts: votedProducts,
      },
      id
    );
  } catch (error) {
    console.error(error);
  }
}
