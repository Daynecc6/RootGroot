import React from "react";
import { Box, TextField, Button } from "@mui/material";

const StorySubmission = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the submitted story here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <TextField
        label="Your Story"
        multiline
        rows={6}
        variant="outlined"
        sx={{ width: "80%", marginBottom: 2 }}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default StorySubmission;
