import Providers from "contexts/providers";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "routers/routes";
import 'react-toastify/dist/ReactToastify.css'; 
import ConfigProvider from "antd/es/config-provider";
import { defaultConfig } from "antd/es/theme/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
const queryClient = new QueryClient();
  return (
    
    <ConfigProvider theme={defaultConfig}>
      <BrowserRouter>
        <Providers>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </Providers>
        <ToastContainer />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
