import { ChatForm, QuestionAnswer, Result, ViewFactory } from "./quesitionType";
import {
  QUESTION_CHANGE_VIEW,
  QUESTION_FETCH_RESULT,
  QUESTION_FETCH_RESULT_SUCCESS,
  QUESTION_UPDATE_FORM,
} from "./questionConstants";

export interface QuestionChangeView {
  type: typeof QUESTION_CHANGE_VIEW;
  payload: ViewFactory;
}

export interface QuestionUpdateForm {
  type: typeof QUESTION_UPDATE_FORM;
  payload: {
    key: keyof ChatForm;
    value: string;
  };
}

export interface QuestionFetchResult {
  type: typeof QUESTION_FETCH_RESULT;
  payload: QuestionAnswer;
}

export interface QuestionFetchResultSuccess {
  type: typeof QUESTION_FETCH_RESULT_SUCCESS;
  payload: Result;
}

export type questionAction =
  | QuestionChangeView
  | QuestionUpdateForm
  | QuestionFetchResult
  | QuestionFetchResultSuccess;

export const questionChangeView = (
  payload: ViewFactory
): QuestionChangeView => ({
  type: QUESTION_CHANGE_VIEW,
  payload,
});

export const questionUpdateForm = (
  key: keyof ChatForm,
  value: string
): QuestionUpdateForm => ({
  type: QUESTION_UPDATE_FORM,
  payload: { key, value },
});

export const questionFetchResult = (
  payload: QuestionAnswer
): QuestionFetchResult => ({
  type: QUESTION_FETCH_RESULT,
  payload,
});

export const questionFetchResultSuccess = (
  payload: Result
): QuestionFetchResultSuccess => ({
  type: QUESTION_FETCH_RESULT_SUCCESS,
  payload,
});
