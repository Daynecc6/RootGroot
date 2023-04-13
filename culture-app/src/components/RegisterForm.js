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

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const checkPasswordsMatch = () => {
    setPasswordsMatch(password === verifyPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const token = await dispatch(register(email, username, password));
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: token });

      if (token) {
        navigate("/"); // Redirect the user to the main content page
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      setErrorMessage("Registration failed: " + error.message);
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
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Verify Password"
          type="password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          onBlur={checkPasswordsMatch}
          error={!passwordsMatch}
          helperText={!passwordsMatch && "Passwords do not match"}
        />
        <Box sx={{ mt: 4 }}>
          <Button fullWidth type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RegisterForm;
