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
    // const axiosResponse = yield call(
    //   axiosInstance.post,
    //   "/get_answer",
    //   payload
    // );
    
    // const axiosRequest: responseQuestion = axiosResponse;
    const axiosResponse: responseQuestion = {
      question: "Mẹ tôi và dượng tôi ở với nhau gần 10 năm nhưng không đăng ký kết hôn. Nay dượng tôi phản bội mẹ tôi, có vợ mới và muốn chia đôi số tài sản, trong đó tiền vốn là của tôi bỏ ra cho mẹ tôi làm ăn. Ông ta đòi làm đơn kiện nếu mẹ tôi không đồng ý chia đôi số tài sản hiện tại. Trường hợp này phải giải quyết như thế nào? (Số tiền tôi đưa mẹ làm ăn không có giấy tờ gì chứng minh cả)",
      answer: "Theo quy định tại khoản 2 Điều 59 Luật Hôn nhân và Gia đình năm 2000 thì tài sản chung của vợ chồng gồm tài sản do vợ, chồng tạo ra, thu nhập do lao động, hoạt động sản xuất, kinh doanh và những thu nhập hợp pháp khác của vợ chồng trong thời kỳ hôn nhân; tài sản mà vợ chồng được thừa kế chung hoặc được tặng cho chung và những tài sản khác mà vợ chồng thoả thuận là tài sản chung. Theo quy định tại khoản 2 Điều 59 Luật Hôn nhân và Gia đình năm 2000 thì tài sản chung của vợ chồng gồm tài sản do vợ, chồng tạo ra, thu nhập do lao động, hoạt động sản xuất, kinh doanh và những thu nhập hợp pháp khác của vợ chồng trong thời kỳ hôn nhân; tài sản mà vợ chồng được thừa kế chung hoặc được tặng cho chung và những tài sản khác mà vợ chồng thoả thuận là tài sản chung. Theo quy định tại khoản 2 Điều 59 Luật",
    }
    // Construct the Result object
    const result: Result = {
      fullName: form.fullName,
      caseType: form.caseType,
      phone: form.phone,
      gender: form.gender,
      question: axiosResponse.question,
      answer: axiosResponse.answer,
    };

    yield put(questionFetchResultSuccess(result));
    yield put(questionChangeView(ViewFactory.result));
  } catch (error) {
    console.error(error);
  }
}
