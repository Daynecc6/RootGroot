import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      bgcolor="secondary.main"
      color="white"
    >
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        This is the "About Us" section. You can provide information about your company or project here.
      </Typography>
    </Box>
  );
};

export default AboutUs;
