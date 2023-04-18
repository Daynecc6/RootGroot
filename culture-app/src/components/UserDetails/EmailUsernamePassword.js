import { TextField, Button, Box } from "@mui/material";
import { FormControl, FormHelperText } from "@mui/material";

const EmailUsernamePassword = ({
  handleNext,
  handleInputChange,
  handlePasswordBlur,
  formData,
  errors,
}) => {
  return (
    <>
      <FormControl fullWidth error={!!errors.email}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth error={!!errors.username}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && <FormHelperText>{errors.username}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth error={!!errors.password}>
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handlePasswordBlur}
        />
        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth error={!!errors.verify_password}>
        <TextField
          fullWidth
          margin="normal"
          label="Verify Password"
          name="verify_password"
          type="password"
          value={formData.verify_password}
          onChange={handleInputChange}
          onBlur={handlePasswordBlur}
        />
        {errors.verify_password && (
          <FormHelperText>{errors.verify_password}</FormHelperText>
        )}
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button fullWidth variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default EmailUsernamePassword;
