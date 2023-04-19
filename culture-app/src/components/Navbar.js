import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authActions";

const NavBar = () => {
  const navLinks = ["Home", "About", "Contact", "WorldMap"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const storeToken = useSelector((state) => state.auth.token);
  const [token, setToken] = useState(storeToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(storeToken);
  }, [storeToken]);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    if (token) {
      dispatch(logout());
      navigate("/home");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          navLinks.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ marginRight: 2 }}
              >
                {link}
              </Typography>
            </Link>
          ))
        )}
        <Box sx={{ flexGrow: 1 }} />
        <div>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {navLinks.map((text) => (
            <ListItem
              button
              key={text}
              onClick={toggleDrawer(false)}
              component={Link}
              to={`/${text.toLowerCase()}`}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
