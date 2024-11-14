import { Navigation } from "@toolpad/core/AppProvider";
import React from "react";
import { createTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RouterPath from "routers/routesContants";
import DashboardIcon from '@mui/icons-material/Dashboard';

export const adminCategories: Navigation = [
  {
    title: "Quảng trị viên",
    kind: "header",
  },
  {
    segment: RouterPath.ADMIN_DB,
    title: "Danh sách",
    icon: <DashboardIcon />,
  },
  {
    segment: RouterPath.ADMIN_BUSINESS_DB,
    title: "Tạo văn phòng",
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
