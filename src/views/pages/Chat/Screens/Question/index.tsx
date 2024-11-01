import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { ViewFactory } from "contexts/question/quesitionType";
import { questionFetchResult } from "contexts/question/questionActions";
import React, { useEffect, useState } from "react";
import FormQuestion from "views/containers/chat/FormQuestion";
import ChatPreview from "views/containers/chat/Preview";
import ResultQuestion from "views/containers/chat/Result";

const Question = () => {
  const viewState = useAppSelector((state) => state.question.view.view);
  const dispatch = useAppDispatch();

  const renderView = () => {
    switch (viewState) {
      case ViewFactory.preview:
        return <ChatPreview />;
      case ViewFactory.question:
        return <FormQuestion />;
      case ViewFactory.result:
        return <ResultQuestion />;
    }
  };

  return (
    <div className="container mx-auto p-5 flex flex-col">{renderView()}</div>
  );
};

export default Question;
