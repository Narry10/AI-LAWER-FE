import { ChatForm, ViewFactory } from "./quesitionType";
import { QUESTION_CHANGE_VIEW, QUESTION_UPDATE_FORM } from "./questionConstants";

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

export type questionAction = QuestionChangeView | QuestionUpdateForm;

export const questionChangeView = (payload: ViewFactory): QuestionChangeView => ({
  type: QUESTION_CHANGE_VIEW,
  payload,
});

export const questionUpdateForm = (key: keyof ChatForm, value: string): QuestionUpdateForm => ({
  type: QUESTION_UPDATE_FORM,
  payload: { key, value },
});
