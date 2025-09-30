import Providers from "contexts/providers";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "routers/routes";
import 'react-toastify/dist/ReactToastify.css'; 
import ConfigProvider from "antd/es/config-provider";

import { defaultConfig } from "antd/es/theme/context";

function App() {

  return (
    <ConfigProvider theme={defaultConfig}>
      <BrowserRouter>
        <Providers>
          <Router />
        </Providers>
        <ToastContainer />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
