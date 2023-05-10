import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { usePurposePage } from "./usePurposePage";

const BackButton = ({ onClick, disabled }) => (
  <Box textAlign="left" mb={2}>
    <Button variant="outlined" onClick={onClick} disabled={disabled}>
      Back
    </Button>
  </Box>
);

const IconGrid = ({ icons, handleClick, isSmallScreen }) => (
  <>
    {icons.map((icon, index) => (
      <Grid item xs={4} sm={4} key={index}>
        <Box
          onClick={() => handleClick(icon.text)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={icon.text}
            src={icon.img}
            sx={{
              width: isSmallScreen ? 100 : 150,
              height: isSmallScreen ? 100 : 150,
              cursor: "pointer",
            }}
          />
          <Typography variant="subtitle1" align="center">
            {icon.text2}
            {icon.text}
          </Typography>
        </Box>
      </Grid>
    ))}
  </>
);

const PurposePage = () => {
  const {
    theme,
    isSmallScreen,
    location,
    countryData,
    selectedPurpose,
    selectedTheme,
    step,
    icons,
    commonThemes,
    subThemes,
    handleBackClick,
    handlePurposeClick,
    handleThemeClick,
    handleSubThemeClick,
    navigate,
  } = usePurposePage();

  console.log(countryData);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "2rem" }}>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          Purpose Page
        </h1>
        <Container maxWidth="md" sx={{ marginBottom: "5rem" }}>
          <BackButton onClick={handleBackClick} disabled={step === 0} />
          <Grid container spacing={2} justifyContent="center">
            {step === 0 && (
              <>
                <Typography variant="h6" align="center">
                  Purposes
                </Typography>
                <IconGrid
                  icons={icons}
                  handleClick={handlePurposeClick}
                  isSmallScreen={isSmallScreen}
                />
              </>
            )}

            {step === 1 && (
              <>
                <Typography variant="h6" align="center">
                  {selectedPurpose} Themes
                </Typography>
                <IconGrid
                  icons={commonThemes}
                  handleClick={handleThemeClick}
                  isSmallScreen={isSmallScreen}
                />
              </>
            )}

            {step === 2 && selectedTheme && subThemes[selectedTheme] && (
              <>
                <Typography variant="h6" align="center">
                  {selectedTheme} Sub-themes
                </Typography>
                <IconGrid
                  icons={subThemes[selectedTheme]}
                  handleClick={handleSubThemeClick}
                  isSmallScreen={isSmallScreen}
                />
              </>
            )}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default PurposePage;
