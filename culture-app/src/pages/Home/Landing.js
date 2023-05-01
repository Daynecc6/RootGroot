import React from "react";
import { Box } from "@mui/material";
import logo from "../../assets/rootgroot.png";

const Landing = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      bgcolor="primary.main"
      color="white"
    >
      <img
        src={logo}
        alt="My Logo"
        style={{ maxWidth: "35%", maxHeight: "35%" }}
      />
    </Box>
  );
};

export default Landing;
