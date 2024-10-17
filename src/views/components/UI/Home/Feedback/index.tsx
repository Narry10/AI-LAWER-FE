import React from "react";
import { motion, useInView } from "framer-motion";
import ping from "assets/images/Ping.svg";
import "assets/styles/components/Feedback.scss";
import { IFeedback } from "pages/home/types";

interface FeedBackProps {
  feedbacks: IFeedback[];
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const FeedBack: React.FC<FeedBackProps> = ({ feedbacks }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className="feed-back"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
    >
      <div className="container feed-back__container">
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ delay: 0.2 }}
        >
          Find out what our most successful clients say about us
        </motion.h2>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ delay: 0.4 }}
        >
          It’s always the best source to hear from others who have already used
          our apps.
        </motion.p>
        <div className="feed-back-group">
          {feedbacks &&
            feedbacks.map((feedback, index) => (
              <motion.div
                key={index}
                className="feed-back-item"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariants}
                transition={{ delay: 0.6 + index * 0.2 }}
              >
                <img src={ping} alt="ping" />
                <p className="feed-back-layout">
                  <strong>{feedback.title}:</strong> {feedback.description}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(FeedBack);
