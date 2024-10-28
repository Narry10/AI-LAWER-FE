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

export interface QuestionAnswer {
  description: string;
  specificSituation: string;
}

export interface Result {
  fullName: string;
  caseType: string;
  phone: string;
  gender: string;
  question: string;
  answer: string;
}

export interface QuestionTemplate extends QuestionAnswer{
  image: string;
  subheader: string;
  tags: string[];
  title: string;
  example: QuestionAnswer;
}

export interface responseQuestion {
  question: string;
  answer: string;
}

export interface QuestionResultState extends CommonState {
  loading: boolean;
  data?: Result;
}
