import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await dispatch(login(username, password));
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: token });

      if (token) {
        navigate("/home"); // Move this inside the if condition and change to /home
        console.log("here");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage("Login failed: Invalid credentials");
    }
  };

  // LoginForm.js
  // ...
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4">Login</Typography>
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
        <Box sx={{ mt: 4, mb: 20, display: "flex", justifyContent: "center" }}>
          <Button sx={{ mr: 2 }} type="submit" variant="contained">
            Login
          </Button>
          <Button component={RouterLink} to="/register" variant="outlined">
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
  // ...
};

export default LoginForm;
