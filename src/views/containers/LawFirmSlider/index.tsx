import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

import Image from "assets/images/Topic_1.svg"; // Ensure this path is correct
import { ArrowRight, Info } from "@mui/icons-material";

const LawFirmSlider: React.FC = () => {
    const lawFirms = [
        {
          name: "Văn phòng luật Hồ Chí Minh",
          image: Image,
          action: "Liên hệ ngay",
          description: "Văn phòng luật Hồ Chí Minh chuyên cung cấp dịch vụ pháp lý chuyên nghiệp và bảo vệ quyền lợi của bạn. Liên hệ: 099876877.",
        },
        {
          name: "Văn phòng luật Hà Nội",
          image: Image,
          action: "Tìm hiểu thêm",
          description: "Văn phòng luật Hà Nội hỗ trợ pháp lý toàn diện và tư vấn chuyên sâu. Liên hệ: 099876878.",
        },
        {
          name: "Văn phòng luật Đà Nẵng",
          image: Image,
          action: "Bắt đầu ngay",
          description: "Văn phòng luật Đà Nẵng đồng hành cùng bạn trong mọi vấn đề pháp lý. Liên hệ: 099876879.",
        },
        {
          name: "Văn phòng luật Hải Phòng",
          image: Image,
          action: "Tham gia cùng chúng tôi",
          description: "Văn phòng luật Hải Phòng bảo vệ quyền lợi của bạn với đội ngũ luật sư giàu kinh nghiệm. Liên hệ: 099876880.",
        },
        {
          name: "Văn phòng luật Cần Thơ",
          image: Image,
          action: "Khám phá dịch vụ",
          description: "Văn phòng luật Cần Thơ tư vấn pháp lý chuyên nghiệp và tận tâm. Liên hệ: 099876881.",
        },
        {
          name: "Văn phòng luật Nha Trang",
          image: Image,
          action: "Nhận tư vấn",
          description: "Văn phòng luật Nha Trang bảo vệ quyền lợi của bạn với dịch vụ pháp lý chất lượng. Liên hệ: 099876882.",
        },
        {
          name: "Văn phòng luật Vũng Tàu",
          image: Image,
          action: "Đặt lịch hẹn",
          description: "Văn phòng luật Vũng Tàu gặp gỡ chuyên gia pháp lý để được tư vấn chi tiết. Liên hệ: 099876883.",
        },
        {
          name: "Văn phòng luật Huế",
          image: Image,
          action: "Tìm hiểu thêm",
          description: "Văn phòng luật Huế hỗ trợ pháp lý toàn diện và tư vấn chuyên sâu. Liên hệ: 099876884.",
        },
        {
          name: "Văn phòng luật Bình Dương",
          image: Image,
          action: "Tư vấn ngay",
          description: "Văn phòng luật Bình Dương bảo vệ quyền lợi của bạn với dịch vụ pháp lý chuyên nghiệp. Liên hệ: 099876885.",
        },
      ];

  return (
    <Box sx={{ margin:4 }} >
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
      >
        {lawFirms.map((firm, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                border: "2px solid transparent",
                transition: "border-color 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <img
                src={firm.image}
                alt={firm.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="h6" sx={{ color: "primary.main", mt: 2 }}>
                {firm.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                {firm.description}
              </Typography>
              <Button
                variant="text"
                color="primary"
                fullWidth
                endIcon={<ArrowRight />}
                sx={{ justifyContent: "space-between" }}
              >
                {firm.action}
              </Button>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LawFirmSlider;
