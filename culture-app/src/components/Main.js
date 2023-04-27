import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { Footer, NavBar } from "./index";
import {
  UserProfile,
  MainContent,
  LoginForm,
  RegisterForm,
  PurposePage,
  WorldMap,
  StoryPage,
} from "../pages/index";

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
          path="/world-map"
          element={
            <ProtectedRoute token={token} fallback={<MainContent />}>
              <WorldMap />
            </ProtectedRoute>
          }
        />
        <Route path="/purpose" element={<PurposePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/storypage" element={<StoryPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Main;
