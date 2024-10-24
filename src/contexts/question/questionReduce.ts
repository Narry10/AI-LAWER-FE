import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionChangeView, QuestionUpdateForm } from "./questionActions";
import {
  QUESTION_CHANGE_VIEW,
  QUESTION_UPDATE_FORM,
} from "./questionConstants";
import {
  QuestionFormState,
  QuestionViewState,
  ViewFactory,
} from "./quesitionType";

const initialState: QuestionViewState = {
  view: ViewFactory.preview,
  loading: false,
  error: undefined,
};

const questionViewSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      QUESTION_CHANGE_VIEW,
      (state, action: QuestionChangeView) => {
        state.view = action.payload;
      }
    );
  },
});

export const questionViewReducer = questionViewSlice.reducer;

const initialFormState: QuestionFormState = {
  loading: false,
  error: undefined,
  formData: {
    description: "",
    specificSituation: "",
    caseType: "",
    fullName: "",
    gender: "",
    phone: "",
  },
};

const questionFormSlice = createSlice({
  name: "form",
  initialState: initialFormState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      QUESTION_UPDATE_FORM,
      (state, action: QuestionUpdateForm) => {
        const { key, value } = action.payload;
        state.formData[key] = value;
      }
    );
  },
});

export const questionFormReducer = questionFormSlice.reducer;
