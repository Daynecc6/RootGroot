import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Header from "./sections/Header";
import Footer from "./sections/Footer";

import Landing from "./sections/area/Landing";
import MainContent from "./sections/Content";
import LoginForm from "./LoginForm";

import RegisterForm from "./RegisterForm";

const ProtectedRoute = ({ token, children, fallback }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : fallback;
};

const Main = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home" //this will change once the user logins still need to update
          element={
            <ProtectedRoute token={token} fallback={<Landing />}>
              <MainContent />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Main;
