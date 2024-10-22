import Providers from "contexts/providers";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "routers/routes";

function App() {
  return (
      <BrowserRouter>
        <Providers>
          <Router />
        </Providers>
      </BrowserRouter>
  );
}

export default App;
