import "assets/styles/components/Product.scss";
import { IProduct } from "pages/home/types";
import React, { useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Button from "views/components/layouts/Button";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const imgVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, type: "spring", stiffness: 100 },
  },
};

const ProductSection: React.FC<IProduct> = ({
  title,
  description,
  imgSrc,
  type = "default",
  buttonText,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const renderContent = useCallback(() => {
    return (
      <motion.div
        className="product-group-content"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInVariants}
        transition={{ delay: 0.2 }}
      >
        <h5>{title}</h5>
        <p>{description}</p>
        <div className="product-btns">
          <Button variant="outlined" size="small">
            {buttonText}
          </Button>
        </div>
      </motion.div>
    );
  }, [title, description, buttonText, isInView]);

  const renderImage = useCallback(() => {
    return (
      <motion.div
        className="product-group-img"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={imgVariants}
        transition={{ delay: 0.8 }}
      >
        <img src={imgSrc} alt="" />
      </motion.div>
    );
  }, [imgSrc, isInView]);

  const renderProductGroup = useCallback(() => {
    switch (type) {
      case "reverse":
        return (
          <div className="product-group reverse product-group--reverse">
            {renderImage()}
            {renderContent()}
          </div>
        );
      default:
        return (
          <div className="product-group">
            {renderContent()}
            {renderImage()}
          </div>
        );
    }
  }, [type, renderContent, renderImage]);

  return (
    <motion.div
      className={`section product ${type == "default" ? "product--bg" : ""}`}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      transition={{ delay: 0.1 }}
    >
      <div className="container">{renderProductGroup()}</div>
    </motion.div>
  );
};

export default React.memo(ProductSection);
