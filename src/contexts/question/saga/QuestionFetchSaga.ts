import { call, all } from "redux-saga/effects";
import { QuestionFetchResult } from "../questionActions";
import { axiosInstance } from "configs/api/api";

export function* handleFetchQuestionSaga(action: QuestionFetchResult) {
  try {
    const { description, specificSituation } = action.payload;
    const payload = {
      description: description,
      specificSituation: specificSituation
    };

    // Axios request
    const axiosRequest = call(axiosInstance.post, '/get_answer', payload);

    // Fetch request
    const fetchRequest = call(fetch, 'http://127.0.0.1:8000/get_answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Execute both requests in parallel
    const [axiosResponse, fetchResponse] = yield all([axiosRequest, fetchRequest]);

    // Handle fetch response
    const fetchData = yield fetchResponse.json();

    // yield put(questionFetchResultSuccess(value));
  } catch (error) {
    console.error(error);
    // yield put(questionFetchFailure(error.message));
  }
}
