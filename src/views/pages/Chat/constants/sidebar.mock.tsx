import { Navigation } from "@toolpad/core/AppProvider";
import React from "react";
import { createTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
  {
    title: "Lưu Trữ",
    kind: "header",
  },
  {
    segment: RouterPath.CHAT_HISTORY_DB,
    title: "Yêu thích",
    icon: <FavoriteIcon/>,
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
