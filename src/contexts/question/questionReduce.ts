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
    description:
      "Tôi muốn biết các biện pháp giải quyết tranh chấp đất đai theo pháp luật Việt Nam. Cụ thể, tôi đang gặp vấn đề với việc tranh chấp quyền sử dụng đất với hàng xóm. Họ đã xây dựng một phần nhà trên mảnh đất của tôi mà không có sự đồng ý của tôi. Tôi muốn biết các bước cần thiết để giải quyết vấn đề này theo quy định của pháp luật.",
    specificSituation:
      "Tranh chấp quyền sử dụng đất với hàng xóm do họ xây dựng một phần nhà trên mảnh đất của tôi mà không có sự đồng ý của tôi.",
    caseType: "Đất đai",
    fullName: "Nguyễn Văn A",
    gender: "male",
    phone: "0123456789",
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
    fullName: "Nguyễn Văn A",
    phone: "0123456789",
    answer:
      "Theo quy định tại Điều 189 Bộ luật Dân sự 2015 quy định về các biện pháp giải quyết tranh chấp đất đai như sau: Các biện pháp giải quyết tranh chấp đất đai Các biện pháp giải quyết tranh chấp đất đai được thực hiện theo pháp luật về đất đai, pháp luật về đất đai và pháp luật có liên quan. Theo đó, các biện pháp giải quyết tranh chấp đất đai được thực hiện theo pháp luật về đất đai, pháp luật về đất đai và pháp luật có liên quan. Các biện pháp giải quyết tranh chấp đất đai được thực hiện theo pháp luật về đất đai, pháp luật về đất đai và pháp luật có liên quan. Trân trọng!",
    question:
      "Các biện pháp giải quyết tranh chấp đất đai theo pháp luật Việt Nam là gì?",
    gender: "male",
    caseType: "Đất đai",
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
