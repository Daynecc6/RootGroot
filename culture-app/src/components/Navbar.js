import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navLinks = ["Home", "About", "Contact", "WorldMap"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {["Home", "About", "Contact", "WorldMap"].map((text) => (
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
