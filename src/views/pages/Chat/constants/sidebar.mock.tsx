import { Navigation } from "@toolpad/core/AppProvider";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { FaHeart, FaLandmark } from "react-icons/fa";
import RouterPath from "routers/routesContants";
import DashboardIcon from '@mui/icons-material/Dashboard';

export const categories: Navigation = [
  {
    title: "Chức năng",
    kind: "header",
  },
  {
    segment: RouterPath.CHAT_DB,
    title: "Tư vấn",
    icon: <DashboardIcon />,
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
