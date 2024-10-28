import React from "react";
import LoadingImage from "assets/images/LoadingIcon.svg";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className, ...rest }) => {
  return (
    <div {...rest} className={`Loading ${className || ""}`}>
      <img src={LoadingImage} alt="Loading" />
    </div>
  );
};

export default Loading;
