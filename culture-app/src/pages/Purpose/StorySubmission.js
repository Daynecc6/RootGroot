import React from "react";
import { Box, TextField, Button } from "@mui/material";

const StorySubmission = () => {
  // ...

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://rootgroot-ht6a.onrender.com/api/story-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add the required authorization header, e.g.:
            // "Authorization": `Bearer ${yourAuthToken}`,
          },
          body: JSON.stringify({ story }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
      } else {
        // Navigate back to the world map after saving the story
        navigate("/world-map");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ...

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
        sx={{
          width: "80%",
          marginBottom: 2,
          "& .Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
        }}
      />

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default StorySubmission;
