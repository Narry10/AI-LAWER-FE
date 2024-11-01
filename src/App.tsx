import Providers from "contexts/providers";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "routers/routes";
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Router />
      </Providers>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
