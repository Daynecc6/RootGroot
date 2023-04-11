import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box bgcolor="primary.main" color="white" p={2}>
      <Typography variant="body1" align="center">
        &copy; {new Date().getFullYear()} My Home Page. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
