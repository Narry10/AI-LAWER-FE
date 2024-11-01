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
  view: ViewFactory.result,
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
    fullName: "Harry",
    phone: "0886314366",
    answer: "Căn cứ Điều 59 Luật Hôn nhân và gia đình năm 2014 quy định: - Vợ, chồng hoặc cả hai người có quyền yêu cầu Tòa án giải quyết ly hôn. - Cha, mẹ, người thân thích khác có quyền yêu cầu Tòa án giải quyết ly hôn khi một bên vợ, chồng do bị bệnh tâm thần hoặc mắc bệnh khác mà không thể nhận thức, làm chủ được hành vi của mình, đồng thời là nạn nhân của bạo lực gia đình do chồng, vợ của họ gây ra làm ảnh hưởng nghiêm trọng đến tính mạng, sức khỏe, tinh thần của họ. - Chồng không có quyền yêu cầu ly hôn trong trường hợp vợ đang có thai, sinh con hoặc đang nuôi con dưới 12 tháng tuổi. - Trong trường hợp vợ đang có thai, sinh con hoặc đang nuôi con dưới 12 tháng tuổi thì chồng không có quyền yêu cầu ly hôn. - Trong trường hợp chồng đang có thai, sinh con hoặc đang nuôi con dưới 12 tháng tuổi thì",
    question: "Mẹ tôi và dượng tôi ở với nhau gần 10 năm nhưng không đăng ký kết hôn Nay dượng tôi phản bội mẹ tôi, có vợ mới và muốn chia đôi số tài sản, trong đó tiền vốn là của tôi bỏ ra cho mẹ tôi làm ăn. Ông ta đòi làm đơn kiện nếu mẹ tôi không đồng ý chia đôi số tài sản hiện tại. Trường hợp này phải giải quyết như thế nào? (Số tiền tôi đưa mẹ làm ăn không có giấy tờ gì chứng minh cả)",
    gender: "female",
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
