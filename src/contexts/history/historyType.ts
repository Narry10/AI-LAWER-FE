import { Result } from "contexts/question/quesitionType";
import { CommonState } from "contexts/types";

// Resual ref to question ferature
export interface History extends Result {
  uid: string;
  create_at: Date;
}

export interface CreateHistory extends History {
  ref_id: string;
}

export interface HistoryFetchPayload {
  uid: string;
}

export interface HistoryState extends CommonState {
  data: History[],
}
