import React from "react";
import LoadingImage from "assets/images/LoadingIcon.svg";

const Loading = () => {
  return (
    <div className="Loading">
      <img src={LoadingImage} alt="" />
    </div>
  );
};

export default Loading;
