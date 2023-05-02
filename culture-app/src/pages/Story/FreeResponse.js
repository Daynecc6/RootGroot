import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const FreeResponse = ({ freeResponse }) => (
  <Box p={2} boxShadow={2} bgcolor="background.paper" mb={2}>
    <Typography variant="h6" gutterBottom>
      {freeResponse}
    </Typography>
    <TextField
      label="Your story"
      variant="outlined"
      fullWidth
      margin="normal"
    />
  </Box>
);

export default FreeResponse;
