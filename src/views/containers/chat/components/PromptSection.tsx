import * as React from "react";
import { motion } from "framer-motion";
import CardPrompt from "views/components/Commons/CardPrompt";
import { PromptMock } from "views/containers/constants/mock";

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
          <CardPrompt
            description={item.description}
            example={item.example}
            image={item.image}
            specificSituation={item.specificSituation}
            subheader={item.subheader}
            tags={item.tags}
            title={item.title}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};