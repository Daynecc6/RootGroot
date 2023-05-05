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
import CreateIcon from "@mui/icons-material/Create";
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
    {
      label: "Story Upload",
      path: "/story-upload-form",
      icon: <CreateIcon />,
      alwaysShowIcon: true,
      iconSize: "large",
    },
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
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        top: "auto",
        width: "100%",
        margin: "0 auto",
        bgcolor: "transparent",
      }}
    >
      <AppBar
        position="static"
        sx={{
          bottom: 0,
          bgcolor: "transparent",
          boxShadow: "none",
          mb: 2,
        }}
      >
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
        <Box
          bgcolor="background.paper"
          borderRadius="8px"
          boxShadow={3}
          px={1}
          sx={{
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "center",
              minHeight: "auto",
              padding: "8px 16px",
            }}
          >
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
                      <ListItemText
                        primary={link.label}
                        sx={{ marginRight: 2 }}
                      />
                    )}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </Toolbar>
        </Box>
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
    </Box>
  );
};

export default NavBar;
