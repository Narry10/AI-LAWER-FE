import React from "react";
import { motion, useInView } from "framer-motion";
import "assets/styles/components/contact.scss";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const ContactSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className="contact"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariants}
    >
      <div className="container">
        <motion.div
          className="contact-group"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          transition={{ delay: 0.2 }}
        >
          <h3>Feel free to contact us</h3>
          <p>
            We’re here to help! If you have any questions or feedback, please
            don’t hesitate to email us at
          </p>
          <strong>support@lawyer.app.</strong>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(ContactSection);
