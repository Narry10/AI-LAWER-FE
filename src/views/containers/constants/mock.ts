import Image1 from 'assets/images/Topic_1.svg';
import Image2 from 'assets/images/Topic_2.svg';
import Image3 from 'assets/images/Topic_3.svg';
import Image4 from 'assets/images/Topic_4.svg';
import { QuestionTemplate } from 'contexts/question/quesitionType';

export const PromptMock: QuestionTemplate[] = [
  {
    title: "Tranh chấp quyền sử dụng đất với hàng xóm",
    description: "Tôi muốn biết các biện pháp giải quyết tranh chấp đất đai theo pháp luật Việt Nam. Cụ thể, tôi đang gặp vấn đề với việc tranh chấp quyền sử dụng đất với hàng xóm. Họ đã xây dựng một phần nhà trên mảnh đất của tôi mà không có sự đồng ý của tôi. Tôi muốn biết các bước cần thiết để giải quyết vấn đề này theo quy định của pháp luật.",
    specificSituation: "Tranh chấp quyền sử dụng đất với hàng xóm do họ xây dựng một phần nhà trên mảnh đất của tôi mà không có sự đồng ý của tôi.",
    image: Image1,
    subheader: "Ngày 1 tháng 1, 2023",
    tags: ["Đất đai", "Pháp lý"],
    example: {
      description: "Tôi muốn biết các biện pháp giải quyết tranh chấp đất đai theo pháp luật Việt Nam.",
      specificSituation: "Tranh chấp quyền sử dụng đất với hàng xóm do họ xây dựng một phần nhà trên mảnh đất của tôi mà không có sự đồng ý của tôi."
    }
  },
  {
    title: "Tranh chấp ranh giới đất đai",
    description: "Tôi muốn biết cách giải quyết tranh chấp ranh giới đất đai với hàng xóm. Họ đã di chuyển cột mốc ranh giới và lấn chiếm một phần đất của tôi. Tôi cần biết các bước pháp lý để giải quyết vấn đề này.",
    specificSituation: "Tranh chấp ranh giới đất đai với hàng xóm do họ di chuyển cột mốc ranh giới và lấn chiếm một phần đất của tôi.",
    image: Image2,
    subheader: "Ngày 2 tháng 1, 2023",
    tags: ["Đất đai", "Pháp lý"],
    example: {
      description: "Tôi muốn biết cách giải quyết tranh chấp ranh giới đất đai với hàng xóm.",
      specificSituation: "Tranh chấp ranh giới đất đai với hàng xóm do họ di chuyển cột mốc ranh giới và lấn chiếm một phần đất của tôi."
    }
  },
  {
    title: "Tranh chấp quyền thừa kế đất đai",
    description: "Tôi muốn biết cách giải quyết tranh chấp quyền thừa kế đất đai trong gia đình. Một thành viên trong gia đình đã chiếm đoạt toàn bộ mảnh đất mà không có sự đồng ý của các thành viên khác. Tôi cần biết các bước pháp lý để giải quyết vấn đề này.",
    specificSituation: "Tranh chấp quyền thừa kế đất đai trong gia đình do một thành viên chiếm đoạt toàn bộ mảnh đất mà không có sự đồng ý của các thành viên khác.",
    image: Image3,
    subheader: "Ngày 3 tháng 1, 2023",
    tags: ["Đất đai", "Pháp lý"],
    example: {
      description: "Tôi muốn biết cách giải quyết tranh chấp quyền thừa kế đất đai trong gia đình.",
      specificSituation: "Tranh chấp quyền thừa kế đất đai trong gia đình do một thành viên chiếm đoạt toàn bộ mảnh đất mà không có sự đồng ý của các thành viên khác."
    }
  },
  {
    title: "Tranh chấp hợp đồng mua bán đất đai",
    description: "Tôi muốn biết cách giải quyết tranh chấp hợp đồng mua bán đất đai. Người bán đã không thực hiện đúng các điều khoản trong hợp đồng và từ chối chuyển nhượng quyền sử dụng đất cho tôi. Tôi cần biết các bước pháp lý để giải quyết vấn đề này.",
    specificSituation: "Tranh chấp hợp đồng mua bán đất đai do người bán không thực hiện đúng các điều khoản trong hợp đồng và từ chối chuyển nhượng quyền sử dụng đất.",
    image: Image4,
    subheader: "Ngày 4 tháng 1, 2023",
    tags: ["Đất đai", "Pháp lý"],
    example: {
      description: "Tôi muốn biết cách giải quyết tranh chấp hợp đồng mua bán đất đai.",
      specificSituation: "Tranh chấp hợp đồng mua bán đất đai do người bán không thực hiện đúng các điều khoản trong hợp đồng và từ chối chuyển nhượng quyền sử dụng đất."
    }
  }
];
