import { History } from "contexts/history";
import { CommonState } from "contexts/types";

// Resual ref to question ferature
export interface Document extends History {}

export interface DocumentFetchPayload {
  ref_id: string;
}

export interface DocumentState extends CommonState {
  data: Document | null;
}
