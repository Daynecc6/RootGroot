import { useAuth } from "./redux/useAuth";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    handleSubmit,
  } = useAuth();

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
};

export default LoginForm;
