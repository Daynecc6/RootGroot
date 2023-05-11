import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { usePurposePage } from "./usePurposePage";

const BackButton = ({ onClick }) => (
  <Box textAlign="left" mb={2}>
    <Button variant="contained" sx={{ color: "black" }} onClick={onClick}>
      Back
    </Button>
  </Box>
);

const IconGrid = ({ icons, handleClick, isSmallScreen }) => (
  <>
    {icons.map((icon, index) => (
      <Grid
        item
        xs={4}
        sm={4}
        key={index}
        container
        justifyContent="center"
        alignItems="center"
      >
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
              width: isSmallScreen ? 125 : 150,
              height: isSmallScreen ? 125 : 150,
              cursor: "pointer",
            }}
          />
          <Typography variant="subtitle1" align="center" fontWeight="bold">
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
    filteredIcons,
    filteredCommonThemes,
    filteredSubThemes,
    handleBackClick,
    handlePurposeClick,
    handleThemeClick,
    handleSubThemeClick,
    navigate,
  } = usePurposePage();

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "2rem" }}>
        <Container maxWidth="md" sx={{ marginBottom: "5rem" }}>
          <Grid container spacing={2} justifyContent="center">
            {step === 0 && (
              <>
                <Grid item xs={12} alignItems="center">
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    style={{
                      fontFamily: "Lobster",
                      textAlign: "center",
                      display: "block",
                      margin: "auto",
                    }}
                  >
                    PURPOSES
                  </Typography>
                </Grid>
                <IconGrid
                  icons={filteredIcons}
                  handleClick={handlePurposeClick}
                  isSmallScreen={isSmallScreen}
                />
                <Grid container justifyContent="center">
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <BackButton onClick={handleBackClick} />
                  </Grid>
                </Grid>
              </>
            )}

            {step === 1 && (
              <>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    style={{
                      fontFamily: "Lobster",
                      textAlign: "center",
                      display: "block",
                      margin: "auto",
                    }}
                  >
                    THEMES
                  </Typography>
                </Grid>
                <IconGrid
                  icons={filteredCommonThemes}
                  handleClick={handleThemeClick}
                  isSmallScreen={isSmallScreen}
                />
                <Grid container justifyContent="center">
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <BackButton onClick={handleBackClick} />
                  </Grid>
                </Grid>
              </>
            )}

            {step === 2 &&
              selectedTheme &&
              filteredSubThemes[selectedTheme] && (
                <>
                  <Grid item xs={12}>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      style={{
                        fontFamily: "Lobster",
                        textAlign: "center",
                        display: "block",
                        margin: "auto",
                      }}
                    >
                      SUB-THEMES
                    </Typography>
                  </Grid>
                  <IconGrid
                    icons={filteredSubThemes[selectedTheme]}
                    handleClick={handleSubThemeClick}
                    isSmallScreen={isSmallScreen}
                  />
                  <Grid container justifyContent="center">
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <BackButton onClick={handleBackClick} />
                    </Grid>
                  </Grid>
                </>
              )}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default PurposePage;
