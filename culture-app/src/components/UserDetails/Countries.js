import React from "react";
import { TextField, Button, Box } from "@mui/material";

const Countries = ({ handleBack, handleInputChange, formData }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Languages Spoke"
        name="languages_spoke"
        value={formData.languages_spoke}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Birth Country"
        name="birth_country"
        value={formData.birth_country}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Countries you have worked in."
        name="countries_worked"
        value={formData.countries_worked}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Countries lived in."
        name="countries_lived"
        value={formData.countries_lived}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Countries you have studied in."
        name="countries_studied"
        value={formData.countries_studied}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Countries you have volunteered in."
        name="countries_volunteered"
        value={formData.countries_volunteered}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Countries you have traveled to."
        name="countries_traveled"
        value={formData.countries_traveled}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Countries on your bucket list."
        name="countries_bucket"
        value={formData.countries_bucket}
        onChange={handleInputChange}
      />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleBack}
          variant="contained"
          sx={{ width: "120px", height: "40px" }}
        >
          Back
        </Button>

        <Box sx={{ width: "16px" }} />

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "120px", height: "40px" }}
        >
          Done
        </Button>
      </Box>
    </>
  );
};

export default Countries;
