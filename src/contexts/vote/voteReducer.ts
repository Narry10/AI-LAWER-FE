import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserVote } from "./voteTypes";
import { CommonError, CommonState } from "contexts/types";


interface VoteState extends CommonState {
  data: IUserVote | null;
  loading: boolean;
  error: CommonError | undefined;
}

const initialState: VoteState = {
  data: null,
  loading: false,
  error: undefined,
};

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  
  },
});

export const voteReducer = voteSlice.reducer;
