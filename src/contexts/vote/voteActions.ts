import { VOTE_FETCH_PRODUCT, VOTE_POST_PRODUCT } from "./voteConstants";
import { IUserVote, VotePostProductPayload } from "./voteTypes";

export interface VotePostProduct {
  type: typeof VOTE_POST_PRODUCT;
  payload:  VotePostProductPayload;
}
export interface VoteFetchProduct {
  type: typeof VOTE_FETCH_PRODUCT;
}

export type voteAction = VotePostProduct |  VoteFetchProduct;

export const VotePostProduct = (payload:  VotePostProductPayload): VotePostProduct => ({
  type: VOTE_POST_PRODUCT,
  payload,
});

export const VoteFetchProduct = (): VoteFetchProduct => ({
  type: VOTE_FETCH_PRODUCT,
});
