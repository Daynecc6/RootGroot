import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { NavBar } from "./index";
import {
  UserProfile,
  MainContent,
  LoginForm,
  RegisterForm,
  PurposePage,
  WorldMap,
  StoryPage,
  StoryUploadForm,
} from "../pages/index";

const ProtectedRoute = ({ token, children, fallback, mapData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return token ? children : fallback;
};

const Main = (mapData) => {
  const token = useSelector((state) => state.auth.token);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://root-groot-webservice.onrender.com/api/user-profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }

        const userData = await response.json();
        setUsername(userData.username);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const RestrictedUploadRoute = ({
    allowedUsernames,
    username,
    children,
    fallback,
  }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!allowedUsernames.includes(username)) {
        navigate("/home");
      }
    }, [allowedUsernames, username, navigate]);

    return allowedUsernames.includes(username) ? children : fallback;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/home" element={<MainContent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/world-map"
          element={
            <ProtectedRoute token={token} fallback={<MainContent />}>
              <WorldMap mapData={mapData} />
            </ProtectedRoute>
          }
        />
        <Route path="/purpose" element={<PurposePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/storypage" element={<StoryPage />} />
        <Route
          path="/story-upload-form"
          element={
            <RestrictedUploadRoute
              allowedUsernames={["Yuchen_Liu", "daynecc"]}
              username={username}
              fallback={<MainContent />}
            >
              <StoryUploadForm />
            </RestrictedUploadRoute>
          }
        />
      </Routes>
      <NavBar />
    </Router>
  );
};

export default Main;
