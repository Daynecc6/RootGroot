import React from "react";
import { TextField, Button, Box } from "@mui/material";

const UserName = ({ handleNext, handleInputChange, formData, handleBack }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Preferred Name"
        name="preferred_name"
        value={formData.preferred_name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
      />
      <Box
        sx={{
          mt: 2,
          mx: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleBack}
          fullWidth
          variant="contained"
          sx={{ width: "120px", height: "40px" }}
        >
          Back
        </Button>
        <Box sx={{ width: "16px" }} />
        <Button
          onClick={handleNext}
          fullWidth
          variant="contained"
          sx={{ width: "120px", height: "40px" }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default UserName;
