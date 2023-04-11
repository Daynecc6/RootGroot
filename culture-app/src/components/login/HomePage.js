import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const HomePage = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Container>
      <Typography variant="h3">Home Page</Typography>
      {isAuthenticated ? (
        <>
          <Typography>You are logged in.</Typography>
          <Button onClick={logout} variant="contained">
            Logout
          </Button>
        </>
      ) : (
        <Typography>
          You are not logged in.{" "}
          <Button component={RouterLink} to="/login">
            Login
          </Button>
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Button component={RouterLink} to="/protected" variant="contained">
          Go to protected page
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
