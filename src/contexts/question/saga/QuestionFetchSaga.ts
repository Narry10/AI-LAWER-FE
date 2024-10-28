import { call } from "redux-saga/effects";
import { QuestionFetchResult } from "../questionActions";
import { axiosInstance } from "configs/api/api";
import { responseQuestion } from "../quesitionType";

export function* handleFetchQuestionSaga(action: QuestionFetchResult) {
  try {
    const { description, specificSituation } = action.payload;
    const answer:{

    } = `description: ${description}, specificSituation: ${specificSituation}`;
    const value:responseQuestion = yield call(
      axiosInstance.get,
      `/get_answer?question=${answer}`
    );
    console.log(value);
    
  } catch (error) {
    console.error(error);
  }
}
