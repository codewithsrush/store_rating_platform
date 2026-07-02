import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import AddUser from "../pages/admin/AddUser";
import AddStore from "../pages/admin/AddStore";
import OwnerDashboard from "../pages/owner/Dashboard";
import OwnerRatings from "../pages/owner/Ratings";
import UserDashboard from "../pages/user/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="stores" element={<Stores />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="add-store" element={<AddStore />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard/>}/>
          <Route path="/owner/ratings" element={<OwnerRatings/>}/>
        </Route>

        {/* User */}
        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}