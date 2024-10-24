import { CommonState } from "contexts/types";

export enum ViewFactory {
  preview = "preview",
  question = "question",
  result = "result",
}

export interface IQuestionView {
  view: ViewFactory;
}

export interface QuestionViewState extends IQuestionView, CommonState {}

export interface ChatForm {
  description: string;
  specificSituation: string;
  caseType: string;
  fullName: string;
  gender: string;
  phone: string;
}

export interface QuestionFormState extends CommonState {
  loading: boolean;
  formData: ChatForm;
}
