import React from "react";
import banner from "assets/images/bg.svg";
import herro01 from "assets/images/Frame 7.svg";
import "assets/styles/components/Banner.scss";
import { motion } from "framer-motion";

const BannerSection = () => {
  return (
    <div className="banner min-h-[75vh]">
      <div className="banner-group-left max-w-[50vw]">
        <h3 className="banner-title ">
          <span className="text-primary-color">Trợ Lý Pháp Lý</span> Sử Dụng AI
        </h3>
        <p className="banner-description">
          Đơn giản hóa các nhiệm vụ pháp lý của bạn với AI Lawyer. Giải pháp thông minh, sử dụng AI của chúng tôi cung cấp trợ lý pháp lý chính xác và hiệu quả, giúp quy trình pháp lý của bạn trở nên mượt mà và đáng tin cậy hơn.
        </p>
      </div>
      <motion.div
        className="banner-group-right"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ rotate: 360, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
      >
        <img src={herro01} alt="ai-lawyer-hero" className="banner-img" />
      </motion.div>
    </div>
  );
};

export default React.memo(BannerSection);