import React from "react";
import { AppBar, Toolbar, IconButton, ListItemText, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorldMapIcon from "@mui/icons-material/Map";
import CreateIcon from "@mui/icons-material/Create";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
import useNavBar from "./useNavBar";

const NavBar = () => {
  const { token, handleLogout } = useNavBar();

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
        bottom: -5,
        top: "auto",
        width: "100%",
        margin: "0 auto",
        bgcolor: "transparent",
        zIndex: 1000,
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
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "auto",
            zIndex: -1,
          }}
        >
          <svg
            viewBox="0 0 500 37.5"
            preserveAspectRatio="none"
            width="100%"
            height="200px"
          >
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="1"
                  dy="1"
                  stdDeviation="2"
                  floodColor="#000000"
                  floodOpacity="0.5"
                />
              </filter>
            </defs>
            <path
              d="M-3.92,39.3525 C.00,-15 478.27,58.075 550.00,-15 L513.26,39.105 L-16.64,41.575 Z"
              fill=""
              filter="url(#shadow)"
            ></path>
          </svg>
        </Box>
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
              ) : (
                <Link
                  to={link.path || ""}
                  style={{ textDecoration: "none", color: "white" }}
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
      </AppBar>
    </Box>
  );
};

export default NavBar;
