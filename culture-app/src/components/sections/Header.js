import React, { useEffect, useState } from "react";
import Nav from "../Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { logout } from "../../redux/authActions";

const Header = () => {
  const storeToken = useSelector((state) => state.auth.token);
  const [token, setToken] = useState(storeToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(storeToken);
  }, [storeToken]);

  const handleLogout = () => {
    if (token) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <AppBar>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <Nav />
        </div>
        <div style={{ flex: 0 }}>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
