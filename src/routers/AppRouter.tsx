import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from '../views/layouts/UserLayout';
import AdminLayout from '../views/layouts/AdminLayout';
import UserHome from '../views/pages/users/UserHome';
import AdminDashboard from '../views/pages/admins/AdminDashboard';

const AppRouter: React.FC = () => (
  <Router>
    {/* <Routes>
      <Route path="/user/*" element={<UserLayout />}>
        <Route index element={<UserHome />} />
      </Route>
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes> */}
  </Router>
);

export default AppRouter;
