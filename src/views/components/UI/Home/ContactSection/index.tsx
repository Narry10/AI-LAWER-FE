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
          <h3>Hãy liên hệ với chúng tôi</h3>
          <p>
            Chúng tôi luôn sẵn sàng giúp đỡ! Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, xin đừng ngần ngại gửi email cho chúng tôi tại
          </p>
          <strong>support@lawyer.app.</strong>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(ContactSection);
