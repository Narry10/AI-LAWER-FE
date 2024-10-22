import * as React from "react";
import { motion } from "framer-motion";
import { PromptMock } from "../constants/mock";
import CardPrompt from "views/components/Commons/CardPrompt";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const PromptSection = () => {
  return (
    <motion.div
      className="grid grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {PromptMock.map((item, index) => (
        <motion.div key={index} variants={itemVariants} custom={index}>
          <CardPrompt item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
};