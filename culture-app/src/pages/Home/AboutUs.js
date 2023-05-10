import React from "react";
import { Box, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      bgcolor="white"
      color="black"
      maxWidth="800px"
      mx="auto"
      p="20px"
    >
      <Typography
        variant="h1"
        fontWeight="bold"
        style={{ fontFamily: "Lobster" }}
      >
        About Us
      </Typography>
      <Box m={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Founder & Creator
        </Typography>
        <Typography variant="body1" paragraph>
          Yuchen Liu
        </Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Programming team
        </Typography>
        <Typography variant="body1" paragraph>
          Dayne Cordray
        </Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Artwork
        </Typography>
        <Typography variant="body1" paragraph>
          Yuchen Liu, Guiyan Dai, Jianbo Liu
        </Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Special Thanks to
        </Typography>
        <Typography variant="body1" paragraph>
          Storytellers from our communities
        </Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Contact us
        </Typography>
        <Typography variant="body1" paragraph>
          betterlouise@126.com
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
