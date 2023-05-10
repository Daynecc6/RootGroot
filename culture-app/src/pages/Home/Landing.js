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
      <Box
        sx={{
          width: "35%",
          height: "auto",
          "@media (max-width: 600px)": { width: "80%" },
        }}
      >
        <img
          src={logo}
          alt="My Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default Landing;
