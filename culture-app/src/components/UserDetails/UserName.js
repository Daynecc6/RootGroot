import React from "react";
import { TextField, Button } from "@mui/material";

const UserName = ({ handleNext, handleInputChange, formData }) => {
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
      <Button onClick={handleNext} fullWidth variant="contained">
        Next
      </Button>
    </>
  );
};

export default UserName;
