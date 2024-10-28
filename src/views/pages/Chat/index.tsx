import { AppProvider } from "@toolpad/core/AppProvider";
import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RouterPath from "routers/routesContants";
import { categories, demoTheme } from "./constants/sidebar.mock";
import logo from "assets/images/LoadingIcon.svg";

interface ChatProps {
  window?: () => Window;
}

export default function DashboardLayoutScreen(props: ChatProps) {
  const { window } = props;
  const navigate = useNavigate();
  const isOpen = React.useRef(false);
  const router = useDemoRouter(RouterPath.CHAT);

  React.useEffect(() => {
    if (!isOpen.current) {
      isOpen.current = true;
      return;
    }
    navigate(`${router.pathname}`);
  }, [router, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={categories}
      theme={demoTheme}
      router={router}
      window={demoWindow}
      branding={{
        logo: <img src={logo} alt="logo" />,
        title: "",
      }}
    >
      <DashboardLayout sx={{backgroundColor:'black'}} >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}
