import * as React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../lib/auth";
import Login from "../pages/Login";
import Recover from "../pages/Recover";
import Navigation from "./Navigation";

import MyProfile from "../pages/Employee/MyProfile";
import ListEmployees from "../pages/Admin/ListEmployees";
import RegisterEmployee from "../pages/Admin/RegisterEmployee";

export default function App() {
  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/user/my-profile" element={<MyProfile />} />
              <Route exact path="/admin" element={<AdminRoute />}>
                <Route exact path="/admin/add" element={<RegisterEmployee />} />
                <Route exact path="/admin/list" element={<ListEmployees />} />
              </Route>
            </Route>
            <Route exact path="/recover" element={<Recover />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

const PrivateRoute = () => {
  const { user } = useAuth();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoute = () => {
  const { user } = useAuth();

  return user.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/user/my-profile" />
  );
};
