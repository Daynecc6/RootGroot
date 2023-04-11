// src/components/LoginForm.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = dispatch(login(username, password));
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: token });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4">Login</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
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
        <Box sx={{ mt: 4 }}>
          <Button fullWidth type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginForm;
