import {
  ArrowBack,
  Description,
  Info,
  Person,
  Phone,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Textarea from "@mui/material/TextareaAutosize";
import Logo from "assets/images/LoadingIcon.svg";
import {
  historyDraftReset,
  historyPost,
  historyRemoveDarftId,
} from "contexts/history";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { ViewFactory } from "contexts/question/quesitionType";
import { questionChangeView } from "contexts/question/questionActions";
import { motion } from "framer-motion";
import useToastily from "hooks/useToastily";
import React, { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ResultQuestion = () => {
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
  const showToast = useToastily();
  const user = useAppSelector((state) => state.user.data);
  const draftId = useAppSelector((state) => state.history.draftId);
  const formData = useAppSelector((state) => state.question.result.data) || {
    answer: "",
    caseType: "",
    description: "",
    fullName: "",
    phone: "",
    question: "",
    gender: "",
  };
  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    dispatch(questionChangeView(ViewFactory.preview));
  };

  const handleToggleFavorite = () => {
    if (!user?.uid) {
      showToast({
        content: "Vui lòng đăng nhập để lưu bản ghi.",
        type: "error",
      });
      return;
    }
    setIsFavorite(!isFavorite);
    if (draftId) {
      dispatch(
        historyRemoveDarftId({
          draftId: draftId,
        })
      );
      showToast({
        content: "Bản ghi nháp đã được bỏ thích.",
        type: "warning",
      });
      return;
    }

    const payload = {
      answer: formData.answer,
      caseType: formData.caseType,
      fullName: formData.fullName,
      phone: formData.phone,
      question: formData.question,
      gender: formData.gender,
      uid: user?.uid ?? "",
    };

    dispatch(historyPost(payload));
    showToast({
      content: "Bản ghi lưu thành công.",
      type: "success",
    });
  };

  useEffect(() => {
    return () => {
      // remove draftId when unmounting DOM
      dispatch(historyDraftReset());
    };
  }, []);

  return (
    <div className="w-full flex flex-col">
      <motion.div
        className="flex items-center justify-center p-2 gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img src={Logo} className="w-[50px]" variants={itemVariants} />
        <motion.h1
          className="text-4xl text-primary-color font-bold"
          variants={itemVariants}
        >
          AI LAWYER - Dự Đoán Kết Quả
        </motion.h1>
      </motion.div>
      <div className="max-h-max bg-gray-800 w-full rounded-2xl p-2 overflow-auto">
        <Box className="w-full h-full rounded-2xl flex p-6 flex-col gap-4 bg-gray-900">
          {formData.fullName && (
            <Box className="flex flex-col gap-2">
              <Typography variant="h6" className="text-white">
                Thông Tin Cá Nhân
              </Typography>
              <Box className="flex items-center gap-2">
                <Person className="text-primary-color" />
                <TextField
                  id="full-name"
                  label="Họ và tên"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  variant="filled"
                  name="fullName"
                  value={formData.fullName}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Box>
              {formData.gender && (
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="text-white">
                    Giới tính
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    value={formData.gender}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Nam"
                      disabled
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Nữ"
                      disabled
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Khác"
                      disabled
                    />
                  </RadioGroup>
                </FormControl>
              )}
              {formData.phone && (
                <Box className="flex items-center gap-2">
                  <Phone className="text-primary-color" />
                  <TextField
                    id="phone"
                    label="Số điện thoại"
                    placeholder="Ví dụ: 0123456789"
                    variant="filled"
                    name="phone"
                    value={formData.phone}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
              )}
            </Box>
          )}
          {formData.question && (
            <Box className="flex flex-col gap-2">
              <FormLabel component="legend" className="text-white">
                Câu hỏi
              </FormLabel>
              <Box className="flex items-center gap-2">
                <Description className="text-primary-color" />
                <Textarea
                  maxRows={8}
                  aria-label="question"
                  placeholder='Ví dụ: "Các biện pháp giải quyết tranh chấp đất đai theo pháp luật Việt Nam là gì?"'
                  name="question"
                  value={formData.question}
                  readOnly
                  className="w-full p-2 bg-gray-800 text-white rounded-md"
                />
              </Box>
            </Box>
          )}
          {formData.answer && (
            <Box className="flex flex-col gap-2">
              <FormLabel component="legend" className="text-white">
                Câu trả lời
              </FormLabel>
              <Box className="flex items-center gap-2">
                <Info className="text-primary-color" />
                <Textarea
                  maxRows={17}
                  aria-label="answer"
                  placeholder='Ví dụ: "Theo quy định tại Điều 189 Bộ luật Dân sự 2015 quy định về các biện pháp giải quyết tranh chấp đất đai như sau: Các biện pháp giải quyết tranh chấp đất đai Các biện pháp giải quyết tranh chấp đất đai được thực hiện theo pháp luật về đất đai, pháp luật về đất đai và pháp luật có liên quan. Theo đó, các biện pháp giải quyết tranh chấp đất đai được thực hiện theo pháp luật về đất đai, pháp luật về đất đai và pháp luật có liên quan. Các biện pháp giải quyết tranh chấp đất đai được thực hiện theo pháp luật về đất đai, pháp luật về đất đai và pháp luật có liên quan. Trân trọng!"'
                  name="answer"
                  value={formData.answer}
                  readOnly
                  className="w-full p-2 bg-gray-800 text-white rounded-md"
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </Box>
            </Box>
          )}
          {formData.caseType && (
            <Box className="flex flex-col gap-2">
              <FormLabel component="legend" className="text-white">
                Loại vụ việc
              </FormLabel>
              <Box className="flex items-center gap-2">
                <Chip
                  label="Đất đai"
                  color={
                    formData.caseType === "Đất đai" ? "primary" : "default"
                  }
                />
                <Chip
                  label="Lao động"
                  color={
                    formData.caseType === "Lao động" ? "secondary" : "default"
                  }
                />
              </Box>
            </Box>
          )}
          <div className="mt-auto flex justify-between items-center">
            <ArrowBack className="cursor-pointer" onClick={handleNextPage} />
            <div className="flex items-center gap-2">
              <Chip
                icon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                label={isFavorite ? "Hủy chọn yêu thích" : "Thêm vào yêu thích"}
                onClick={handleToggleFavorite}
                sx={{
                  backgroundColor: isFavorite ? "primary.main" : "default",
                  color: isFavorite ? "white" : "text.primary",
                  "& .MuiChip-icon": {
                    color: isFavorite ? "white" : "primary.main",
                  },
                }}
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ResultQuestion;
