import React from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const UserName = ({
  handleNext,
  handleInputChange,
  formData,
  handleBack,
  errors,
}) => {
  return (
    <>
      <FormControl
        fullWidth
        error={!!errors.first_name}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        {errors.first_name && (
          <FormHelperText>{errors.first_name}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.last_name}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        {errors.last_name && (
          <FormHelperText>{errors.last_name}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.preferred_name}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Preferred Name"
          name="preferred_name"
          value={formData.preferred_name}
          onChange={handleInputChange}
        />
        {errors.preferred_name && (
          <FormHelperText>{errors.preferred_name}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.age}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        {errors.age && <FormHelperText>{errors.age}</FormHelperText>}
      </FormControl>

      <FormControl
        fullWidth
        error={!!errors.gender}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "black",
          },
        }}
      >
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
      </FormControl>

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
