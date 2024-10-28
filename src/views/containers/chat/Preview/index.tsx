import { Send } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import Logo from "assets/images/LoadingIcon.svg";
import { motion } from "framer-motion";
import React from "react";
import { PromptSection } from "../components/PromptSection";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { questionChangeView } from "contexts/question/questionActions";
import { ViewFactory } from "contexts/question/quesitionType";

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

const ChatPreview = () => {
  const dispath = useAppDispatch();

  const handleNextPage = () => {
    dispath(questionChangeView(ViewFactory.question));
  };

  return (
    <div className="container mx-auto p-5 flex flex-col">
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
      <motion.div
        className="w-full h-[40vh] flex items-center cursor-pointer"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onClick={handleNextPage}
      >
        <motion.div
          className="flex items-center group bg-gray-800 rounded-full py-1 px-2 mx-auto w-[50vw] shadow-md"
          variants={itemVariants}
        >
          <motion.img src={Logo} className="w-[30px]" variants={itemVariants} />
          <motion.div
            className="w-full flex items-center px-4 py-1 bg-slate-900 rounded-full"
            variants={itemVariants}
          >
            <InputBase
              type="text"
              className="border-none outline-none flex-1 text-black cursor-pointer"
              placeholder="Yêu cầu pháp lý của bạn ?"
            />
            <IconButton type="submit" className="text-primary-color">
              <Send />
            </IconButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChatPreview;
