import { axiosInstance } from "configs/api/api";
import { call, put, select } from "redux-saga/effects";
import { responseQuestion, Result, ViewFactory } from "../quesitionType";
import {
  questionChangeView,
  QuestionFetchResult,
  questionFetchResultSuccess,
} from "../questionActions";

export function* handleFetchQuestionSaga(action: QuestionFetchResult) {
  try {
    const { description, specificSituation } = action.payload;

    // Get form data from the state
    const form = yield select((state) => state.question.form.formData);

    const payload = {
      description: description,
      specificSituation: specificSituation,
    };

    // Axios request
    const axiosResponse = yield call(
      axiosInstance.post,
      "/get_answer",
      payload
    );
    
    const axiosRequest: responseQuestion = axiosResponse;

    // Construct the Result object
    const result: Result = {
      fullName: form.fullName,
      caseType: form.caseType,
      phone: form.phone,
      gender: form.gender,
      question: axiosRequest.question,
      answer: axiosRequest.answer,
    };

    yield put(questionFetchResultSuccess(result));
    yield put(questionChangeView(ViewFactory.result));
  } catch (error) {
    console.error(error);
  }
}
