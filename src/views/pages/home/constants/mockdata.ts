import { IFeedback, IProduct } from "../types";
import Image1 from 'assets/images/Feature1.svg';
import Image2 from 'assets/images/feature2.svg';

export const productMock: IProduct[] = [
    {
        title: 'Phân Tích Tài Liệu Pháp Lý',
        description: 'Công cụ Phân Tích Tài Liệu Pháp Lý của chúng tôi sử dụng AI tiên tiến để xem xét và phân tích tài liệu pháp lý. Nó làm nổi bật các điều khoản chính, xác định các rủi ro tiềm ẩn và cung cấp bản tóm tắt nội dung của tài liệu, giúp bạn tiết kiệm thời gian và đảm bảo độ chính xác.',
        buttonText: 'Phân Tích Ngay',
        link: '/features/legal-document-analyzer',
        imgSrc: Image1,
        type: 'default'
    },
    {
        title: 'Trợ Lý Nghiên Cứu Án Lệ',
        description: 'Trợ Lý Nghiên Cứu Án Lệ giúp bạn tìm kiếm án lệ liên quan một cách nhanh chóng và hiệu quả. Với khả năng tìm kiếm mạnh mẽ và cơ sở dữ liệu toàn diện, bạn có thể dễ dàng tìm thấy các tiền lệ và tài liệu pháp lý để hỗ trợ cho các vụ án của mình.',
        buttonText: 'Trợ Lý Nghiên Cứu',
        link: '/features/case-law-research-assistant',
        imgSrc: Image2,
        type: 'reverse'
    },
];

export const feedbackMock: IFeedback[] = [
    {
        title: 'Dịch Thuật Tài Liệu Pháp Lý',
        description: 'Ứng dụng này rất hữu ích cho việc dịch thuật tài liệu pháp lý. Tôi cần xem xét một hợp đồng được viết bằng ngôn ngữ nước ngoài, và ứng dụng này đã dịch nó một cách chính xác và nhanh chóng. Bản dịch rõ ràng và dễ hiểu, giúp tôi tiết kiệm rất nhiều thời gian và công sức. Rất khuyến khích cho bất kỳ ai làm việc với tài liệu pháp lý quốc tế.',
    },
    {
        title: 'Tìm Kiếm Án Lệ',
        description: 'Việc tìm kiếm án lệ liên quan chưa bao giờ dễ dàng hơn. Ứng dụng này cho phép tôi nhanh chóng tìm kiếm và tìm thấy án lệ phù hợp với các vụ án hiện tại của mình. Chức năng tìm kiếm mạnh mẽ và kết quả rất toàn diện. Đây là một công cụ không thể thiếu cho bất kỳ chuyên gia pháp lý nào.',
    },
    {
        title: 'Quản Lý Khách Hàng',
        description: 'Quản lý thông tin khách hàng và chi tiết vụ án trở nên dễ dàng với ứng dụng này. Nó giữ mọi thứ được tổ chức và dễ dàng truy cập. Tôi có thể theo dõi tiến trình vụ án, quản lý các cuộc hẹn và giao tiếp với khách hàng tất cả trong một nơi. Đây là một công cụ vô giá cho bất kỳ công ty luật nào.',
    },
    {
        title: 'Cố Vấn Pháp Lý AI',
        description: 'Tôi hoàn toàn ấn tượng với ứng dụng này. Nó cung cấp lời khuyên pháp lý thông minh về nhiều chủ đề khác nhau. Dù tôi cần giúp đỡ soạn thảo tài liệu pháp lý hay hiểu một vấn đề pháp lý phức tạp, ứng dụng này đều có câu trả lời. Nó giống như có một cố vấn pháp lý cá nhân sẵn sàng 24/7.',
    },
];
