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
  useEffect(() => {
    dispatch(
      questionFetchResult({
        description:
          "Tôi muốn biết các biện pháp giải quyết tranh chấp đất đai theo pháp luật Việt Nam. Cụ thể, tôi đang gặp vấn đề với việc tranh chấp quyền sử dụng đất với hàng xóm. Họ đã xây dựng một phần nhà trên mảnh đất của tôi mà không có sự đồng ý của tôi. Tôi muốn biết các bước cần thiết để giải quyết vấn đề này theo quy định của pháp luật.",
        specificSituation:
          "Tranh chấp quyền sử dụng đất với hàng xóm do họ xây dựng một phần nhà trên mảnh đất của tôi mà không có sự đồng ý của tôi.",
      })
    );
  }, [dispatch]);

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
