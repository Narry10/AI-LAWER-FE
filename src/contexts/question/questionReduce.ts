import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QuestionChangeView,
  QuestionFetchResultSuccess,
  QuestionUpdateForm,
} from "./questionActions";
import {
  QUESTION_CHANGE_VIEW,
  QUESTION_FETCH_RESULT,
  QUESTION_FETCH_RESULT_ERROR,
  QUESTION_FETCH_RESULT_SUCCESS,
  QUESTION_UPDATE_FORM,
} from "./questionConstants";
import {
  QuestionFormState,
  QuestionResultState,
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
    fullName: " ",
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

const initialResultState: QuestionResultState = {
  data: {
    fullName: "",
    phone: "",
    answer: "",
    question: "",
    gender: "",
    caseType: "",
  },
  loading: false,
};

const questionResultSlice = createSlice({
  initialState: initialResultState,
  name: "result",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(QUESTION_FETCH_RESULT, (state) => {
      state.loading = true;
    });
    builder.addCase(
      QUESTION_FETCH_RESULT_SUCCESS,
      (state, action: QuestionFetchResultSuccess) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(QUESTION_FETCH_RESULT_ERROR, (state, action: any) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const questionResultReducer = questionResultSlice.reducer;
