import React, { useLayoutEffect, useState } from "react";
import {
  ArrowBack,
  Description,
  Info,
  Person,
  Phone,
} from "@mui/icons-material";
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
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import { ViewFactory } from "contexts/question/quesitionType";
import {
  questionChangeView,
  questionFetchResult,
  questionUpdateForm,
} from "contexts/question/questionActions";
import { motion } from "framer-motion";
import Loading from "views/components/Commons/Loading";
import { CaseType, caseTypes } from "views/containers/constants/caseTypeMock";

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

const FormQuestion = () => {
  const formData = useAppSelector((state) => state.question.form.formData);
  const loading = useAppSelector((state) => state.question.result.loading);
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState({
    fullName: false,
    phone: false,
    description: false,
    specificSituation: false,
    gender: false,
    caseType: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(questionUpdateForm(name, value));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleChipClick = (caseType) => {
    dispatch(questionUpdateForm("caseType", caseType));
    setErrors((prevErrors) => ({ ...prevErrors, caseType: false }));
  };

  const handleBackPage = () => {
    dispatch(questionChangeView(ViewFactory.preview));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: !formData.fullName,
      phone: !formData.phone,
      description: !formData.description,
      specificSituation: !formData.specificSituation,
      gender: !formData.gender,
      caseType: !formData.caseType,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      dispatch(
        questionFetchResult({
          description: formData.description,
          specificSituation: formData.specificSituation,
        })
      );
    }
  };

  // auto ref user infomation to input
  useLayoutEffect(() => {
    if (user) {
      dispatch(questionUpdateForm("fullName", user?.displayName || ""));
    }
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
          AI LAWYER
        </motion.h1>
      </motion.div>
      <div className="max-h-max bg-gray-800 w-full rounded-2xl p-2 overflow-auto">
        <Box
          component="form"
          className="w-full h-full rounded-2xl flex p-6 flex-col gap-4 bg-gray-900"
          onSubmit={handleSubmit}
        >
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
                onChange={handleChange}
                fullWidth
                error={errors.fullName}
                helperText={errors.fullName && "Họ và tên là bắt buộc"}
              />
            </Box>
            <FormControl component="fieldset">
              <FormLabel component="legend" className="text-white">
                Giới tính
              </FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
              {errors.gender && (
                <Typography variant="body2" color="error">
                  Giới tính là bắt buộc
                </Typography>
              )}
            </FormControl>
            <Box className="flex items-center gap-2">
              <Phone className="text-primary-color" />
              <TextField
                id="phone"
                label="Số điện thoại"
                placeholder="Ví dụ: 0123456789"
                variant="filled"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                error={errors.phone}
                helperText={errors.phone && "Số điện thoại là bắt buộc"}
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-2">
            <FormLabel component="legend" className="text-white">
              Mô tả vụ việc
            </FormLabel>
            <Box className="flex items-center gap-2">
              <Description className="text-primary-color" />
              <Textarea
                maxRows={8}
                aria-label="description"
                placeholder='Ví dụ: "Tôi muốn biết quy trình ly hôn tại Việt Nam"'
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md"
                style={{ borderColor: errors.description ? "red" : "inherit" }}
              />
            </Box>
            {errors.description && (
              <Typography variant="body2" color="error">
                Mô tả vụ việc là bắt buộc
              </Typography>
            )}
          </Box>
          <Box className="flex flex-col gap-2">
            <FormLabel component="legend" className="text-white">
              Tình Huống Cụ Thể
            </FormLabel>
            <Box className="flex items-center gap-2">
              <Info className="text-primary-color" />
              <Textarea
                maxRows={17}
                aria-label="specific-situation"
                placeholder='Ví dụ: "Tôi và vợ chồng tôi đã không hòa hợp với nhau từ lâu. Chúng tôi đã cố gắng hòa giải nhưng không thành công. Tôi muốn biết các bước cần thiết để tiến hành ly hôn và quyền lợi của tôi trong quá trình này. Ngoài ra, tôi cũng muốn biết về quyền nuôi con và phân chia tài sản sau khi ly hôn."'
                name="specificSituation"
                value={formData.specificSituation}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md"
                style={{
                  borderColor: errors.specificSituation ? "red" : "inherit",
                }}
              />
            </Box>
            {errors.specificSituation && (
              <Typography variant="body2" color="error">
                Tình huống cụ thể là bắt buộc
              </Typography>
            )}
          </Box>
          <Box className="flex flex-col gap-2">
            <Box className="flex flex-col gap-2">
              <FormLabel component="legend" className="text-white">
                Loại vụ việc
              </FormLabel>
              <Box className="flex items-center gap-2">
                {caseTypes.map((caseType: CaseType) => (
                  <Chip
                    key={caseType.label}
                    label={caseType.label}
                    color={
                      formData.caseType === caseType.label
                        ? caseType.color
                        : "default"
                    }
                    onClick={() => handleChipClick(caseType.label)}
                  />
                ))}
              </Box>
              {errors.caseType && (
                <Typography variant="body2" color="error">
                  Loại vụ việc là bắt buộc
                </Typography>
              )}
            </Box>
          </Box>
          <div className="mt-auto flex justify-between items-center">
            <ArrowBack className="cursor-pointer" onClick={handleBackPage} />
            <button className="p-2 font-bold text-sm rounded-full border-2 border-primary-color border-solid w-max flex items-center gap-2 bg-gray-800 hover:bg-primary-color hover:text-white transition-colors">
              {loading ? (
                <Loading className="w-[20px]" />
              ) : (
                <motion.img
                  src={Logo}
                  className="w-[20px] h-[20px]"
                  variants={itemVariants}
                />
              )}
              Xem kết quả
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default FormQuestion;
