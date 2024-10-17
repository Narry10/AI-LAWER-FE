export type IProduct = string;

export interface IUserVote {
  email: string;
  votedProducts: IProduct[];
}

export interface VotePostProductPayload extends IUserVote{
  id: string;
}
