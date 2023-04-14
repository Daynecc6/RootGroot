// src/components/RegisterForm.js
import { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { register } from "../redux/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EmailUsernamePassword from "./UserDetails/EmailUsernamePassword";
import UserName from "./UserDetails/UserName";
import Countries from "./UserDetails/Countries";
// ... import other step components

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    verify_password: "",
    first_name: "",
    last_name: "",
    preferred_name: "",
    age: "",
    gender: "",
    languages_spoke: "",
    birth_country: "",
    countries_worked: "",
    countries_lived: "",
    countries_studied: "",
    countries_volunteered: "",
    countries_traveled: "",
    countries_bucket: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.verify_password) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const token = await dispatch(register(formData));
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: token });

      if (token) {
        console.log("here");
        navigate("/home"); // Redirect the user to the main content page
      }
      return token;
    } catch (error) {
      console.error("Registration failed:", error.message);
      setErrorMessage("Registration failed: " + error.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailUsernamePassword
            handleNext={handleNext}
            handleInputChange={handleInputChange}
            formData={formData}
          />
        );
      case 2:
        return (
          <UserName
            handleNext={handleNext}
            handleInputChange={handleInputChange}
            formData={formData}
          />
        );
      case 3:
        return (
          <Countries
            handleNext={handleNext}
            handleInputChange={handleInputChange}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4">Register</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {renderStep()}
      </form>
    </Container>
  );
};

export default RegisterForm;
