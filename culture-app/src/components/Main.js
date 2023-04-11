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
import Content from "./sections/Content";
import AboutApp from "./sections/area/AboutApp";
import AboutUs from "./sections/area/AboutUs";
import Landing from "./sections/area/Landing";
import MainContent from "./sections/Content";
import LoginForm from "./LoginForm";

const ProtectedRoute = ({ token, children, fallback }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
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
        <Route
          path="/"
          element={
            <ProtectedRoute token={token} fallback={<MainContent />}>
              <MainContent />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/app" element={<AboutApp />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Main;
