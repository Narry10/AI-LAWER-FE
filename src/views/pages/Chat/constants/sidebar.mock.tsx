import { Navigation } from "@toolpad/core/AppProvider";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { FaHeart, FaLandmark } from "react-icons/fa";
import RouterPath from "routers/routesContants";

export const categories: Navigation = [
  {
    title: "Danh mục",
    kind: "header",
  },
  {
    segment: RouterPath.CHAT_Question_Marriage_DB,
    title: "Hôn Nhân",
    icon: <FaHeart />,
  },
  {
    segment: RouterPath.CHAT_Question_Land_DB,
    title: "Đất đai",
    icon: <FaLandmark />,
  },
];

export const demoTheme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
