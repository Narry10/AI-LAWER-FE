import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Import các page/component
// ...existing code...

// Dummy components (thay bằng import thực tế)



const AppRouter = () => (
  <Router>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<>login</>} />
     
        <Route path="*" element={<Navigate to="/sites" />} />
      </Routes>
    </React.Suspense>
  </Router>
);

export default AppRouter;
