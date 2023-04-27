import { useRegister } from "../Login/redux/useRegister";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EmailUsernamePassword from "./EmailUsernamePassword";
import UserName from "./UserName";
import Countries from "./Countries";

const RegisterForm = () => {
  const {
    step,
    setStep,
    formData,
    setFormData,
    errorMessage,
    inputError,
    setInputError,
    handleNextClick,
    handleBackClick,
    handleInputChange,
    handleSubmit,
    checkEmailUsername,
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
    <Container maxWidth="xs">
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
