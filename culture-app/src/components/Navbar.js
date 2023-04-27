import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WorldMapIcon from "@mui/icons-material/Map";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
import useNavBar from "./useNavBar";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { token, isMobile, handleLogout } = useNavBar();

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const navLinks = [
    {
      label: "Home",
      path: "/home",
      icon: <HomeIcon />,
      alwaysShowIcon: true,
      iconSize: "large",
    },
    {
      label: "World Map",
      path: "/world-map",
      icon: <WorldMapIcon />,
      alwaysShowIcon: true,
      iconSize: "large",
    },
    {
      label: "User-Profile",
      path: "/user-profile",
      icon: <AccountBoxIcon />,
      alwaysShowIcon: true,
      iconSize: "large",
    },
    { type: "spacer" },
    ...(!token
      ? [
          { label: "Login", path: "/login" },
          { label: "Register", path: "/register" },
        ]
      : [
          {
            label: "Logout",
            onClick: handleLogout,
          },
        ]),
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        {navLinks.map((link) => (
          <React.Fragment key={link.label}>
            {link.type === "spacer" ? (
              <Box sx={{ flexGrow: 1 }} />
            ) : isMobile ? null : (
              <Link
                to={link.path || ""}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={link.onClick}
              >
                {link.alwaysShowIcon ? (
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label={link.label}
                    sx={{ fontSize: link.iconSize }}
                  >
                    {link.icon && (
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label={link.label}
                        sx={{ mr: 1 }}
                      >
                        {React.cloneElement(link.icon, {
                          fontSize: link.iconSize,
                        })}
                      </IconButton>
                    )}
                  </IconButton>
                ) : (
                  <ListItemText primary={link.label} sx={{ marginRight: 2 }} />
                )}
              </Link>
            )}
          </React.Fragment>
        ))}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {navLinks.map(
            (link, index) =>
              link.type !== "spacer" && (
                <ListItem
                  button
                  key={index}
                  onClick={toggleDrawer(false)}
                  component={link.path ? Link : "div"}
                  to={link.path}
                >
                  {link.icon ? (
                    <ListItemIcon>
                      {React.cloneElement(link.icon, { fontSize: "large" })}
                    </ListItemIcon>
                  ) : (
                    <ListItemText primary={link.label} />
                  )}
                </ListItem>
              )
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
