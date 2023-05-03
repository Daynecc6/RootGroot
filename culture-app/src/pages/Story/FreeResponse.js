import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const FreeResponse = ({ freeResponse, storyID }) => {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setResponse(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const userResponse = await fetch(
        "http://localhost:3001/api/free-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storyId: storyID,
            question: freeResponse,
            response,
          }),
        }
      );

      if (userResponse.ok) {
        console.log("Free response saved.");
        setSubmitted(true);
      } else {
        console.error("Error saving free response.");
      }
    } catch (error) {
      console.error("Error saving free response:", error);
    }
  };

  return (
    <Box p={2} boxShadow={2} bgcolor="background.paper" mb={2}>
      <Typography variant="h6" gutterBottom>
        {freeResponse}
      </Typography>
      <TextField
        label="Your story"
        variant="outlined"
        fullWidth
        margin="normal"
        value={response}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 1 }}
        disabled={submitted}
      >
        {submitted ? "Submitted" : "Submit"}
      </Button>
    </Box>
  );
};

export default FreeResponse;
