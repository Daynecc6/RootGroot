import { useRegister } from "../Login/redux/useRegister";
import { Container, Box, Typography, Alert } from "@mui/material";
import EmailUsernamePassword from "./EmailUsernamePassword";
import UserName from "./UserName";
import Countries from "./Countries";

const RegisterForm = () => {
  const {
    step,
    formData,
    errorMessage,
    inputError,
    handleNextClick,
    handleBackClick,
    handleInputChange,
    handleSubmit,
    handlePasswordBlur,
  } = useRegister();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailUsernamePassword
            handleNext={handleNextClick} // Updated here
            handleInputChange={handleInputChange}
            handlePasswordBlur={handlePasswordBlur}
            formData={formData}
            errors={inputError}
          />
        );

      case 2:
        return (
          <UserName
            handleNext={handleNextClick}
            handleBack={handleBackClick}
            handleInputChange={handleInputChange}
            formData={formData}
            errors={inputError}
          />
        );
      case 3:
        return (
          <Countries
            handleNext={handleNextClick}
            handleBack={handleBackClick}
            handleInputChange={handleInputChange}
            formData={formData}
            errors={inputError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xs" sx={{ pb: 20 }}>
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4">Register</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {renderStep()}
      </form>
    </Container>
  );
};

export default RegisterForm;
