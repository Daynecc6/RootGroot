import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Footer from "./sections/Footer";
import NavBar from "./Navbar";
import UserProfile from "./UserProfile";
import MainContent from "./sections/Content";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PurposePage from "./PurposePage";
import WorldMap from "./WorldMap";

const ProtectedRoute = ({ token, children, fallback }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return token ? children : fallback;
};

const Main = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<MainContent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/world map"
          element={
            <ProtectedRoute token={token} fallback={<MainContent />}>
              <WorldMap />
            </ProtectedRoute>
          }
        />
        <Route path="/purpose" element={<PurposePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Main;
