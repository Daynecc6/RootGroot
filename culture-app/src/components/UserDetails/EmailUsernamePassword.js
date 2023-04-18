import { TextField, Button, Box } from "@mui/material";

const EmailUsernamePassword = ({
  handleNext,
  handleInputChange,
  handlePasswordBlur,
  formData,
}) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
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
      <Box sx={{ mt: 2 }}>
        <Button fullWidth variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default EmailUsernamePassword;
