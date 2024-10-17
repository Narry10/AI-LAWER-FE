import React from "react";
import banner from "assets/images/bg.svg";
import herro01 from "assets/images/Frame 7.svg";
import "assets/styles/components/Banner.scss";
import { motion } from "framer-motion";

const BannerSection = () => {
  return (
    <div className="banner min-h-[75vh]" >
      <div className="banner-group-left">
        <h3 className="banner-title"><span className="text-primary-color">AI-Powered</span> Legal Assistance</h3>
        <p className="banner-description">
          Simplify your legal tasks with AI Lawyer. Our intelligent, AI-powered
          solutions provide accurate and efficient legal assistance, making your
          legal processes smoother and more reliable.
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
