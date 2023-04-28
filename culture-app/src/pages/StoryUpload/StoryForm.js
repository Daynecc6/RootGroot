import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function StoryForm({ formData, handleChange }) {
  return (
    <>
      <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
        <Typography variant="h6">Information</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Subtheme"
            name="subtheme"
            value={formData.subtheme}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Scenario"
            name="scenario"
            value={formData.scenario}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Free Response"
            name="freeresp"
            value={formData.freeresp}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2 }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default StoryForm;
