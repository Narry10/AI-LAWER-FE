import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PromptSection } from "./components/PromptSection";
import Logo from "assets/images/LoadingIcon.svg";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Question = () => {
  const location = useLocation();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const category = pathParts[pathParts.length - 1];
    setCategory(category);
  }, [location]);

  return (
    <div className="container mx-auto p-5">
      <motion.div
        className="flex items-center justify-center p-2 gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img src={Logo} className="w-[50px]" variants={itemVariants} />
        <motion.h1
          className="text-4xl text-primary-color font-bold"
          variants={itemVariants}
        >
          AI LAWYER
        </motion.h1>
      </motion.div>
      <PromptSection />
    </div>
  );
};

const BannerSection = () => {
  return (
    <div className="flex justify-between mb-5">
      <Card className="flex-1 min-w-[275px] mr-4">
        <CardContent>
          <Typography variant="h6">Công ty 1</Typography>
          <Typography>Thông tin về công ty 1...</Typography>
        </CardContent>
      </Card>
      <Card className="flex-1 min-w-[275px] mr-4">
        <CardContent>
          <Typography variant="h6">Công ty 2</Typography>
          <Typography>Thông tin về công ty 2...</Typography>
        </CardContent>
      </Card>
      <Card className="flex-1 min-w-[275px]">
        <CardContent>
          <Typography variant="h6">Công ty 3</Typography>
          <Typography>Thông tin về công ty 3...</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
