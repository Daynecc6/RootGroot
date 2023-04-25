import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

const PurposePage = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [step, setStep] = useState(0);

  const icons = [
    {
      img: "https://via.placeholder.com/150",
      text: "Let's go! - Travel",
    },
    {
      img: "https://via.placeholder.com/150",
      text: "Have fun! - Study",
    },
    {
      img: "https://via.placeholder.com/150",
      text: "It's my... - Business",
    },
    {
      img: "https://via.placeholder.com/150",
      text: "I am here for you. - Volunteer",
    },
    {
      img: "https://via.placeholder.com/150",
      text: "Once upon a time... - Storyteller",
    },
    {
      img: "https://via.placeholder.com/150",
      text: "Tell me more! - Story-hunter",
    },
  ];
  const commonThemes = [
    { img: "https://via.placeholder.com/150", text: "Social Circle" },
    { img: "https://via.placeholder.com/150", text: "Life Impact" },
    { img: "https://via.placeholder.com/150", text: "Skills" },
    { img: "https://via.placeholder.com/150", text: "Development" },
    { img: "https://via.placeholder.com/150", text: "Education" },
    { img: "https://via.placeholder.com/150", text: "Beliefs" },
    { img: "https://via.placeholder.com/150", text: "Social Impact" },
    { img: "https://via.placeholder.com/150", text: "Politics" },
    { img: "https://via.placeholder.com/150", text: "Regulation/Legalization" },
    { img: "https://via.placeholder.com/150", text: "Healthcare" },
    { img: "https://via.placeholder.com/150", text: "Versus" },
  ];
  const subThemes = {
    "Social Circle": [
      { img: "https://via.placeholder.com/150", text: "Relationship" },
      { img: "https://via.placeholder.com/150", text: "Family" },
      { img: "https://via.placeholder.com/150", text: "Community" },
    ],
    "Life Impact": [
      { img: "https://via.placeholder.com/150", text: "Personal Sensation" },
      { img: "https://via.placeholder.com/150", text: "Physiological Needs" },
      { img: "https://via.placeholder.com/150", text: "Challenges" },
      { img: "https://via.placeholder.com/150", text: "Consumption" },
    ],
    Skills: [
      { img: "https://via.placeholder.com/150", text: "Personal Skills" },
      { img: "https://via.placeholder.com/150", text: "Interpersonal Skills" },
    ],
    Development: [
      { img: "https://via.placeholder.com/150", text: "Personal Development" },
      {
        img: "https://via.placeholder.com/150",
        text: "Professional Development/Life",
      },
      {
        img: "https://via.placeholder.com/150",
        text: "Intercultural Competence",
      },
    ],
    Education: [{ img: "https://via.placeholder.com/150", text: "Education" }],
    Beliefs: [{ img: "https://via.placeholder.com/150", text: "Beliefs" }],
    "Social Impact": [
      { img: "https://via.placeholder.com/150", text: "Social Justice" },
      { img: "https://via.placeholder.com/150", text: "Human Rights" },
    ],
    Politics: [{ img: "https://via.placeholder.com/150", text: "Politics" }],
    "Regulation/Legalization": [
      {
        img: "https://via.placeholder.com/150",
        text: "Regulation/Legalization",
      },
    ],
    Healthcare: [
      { img: "https://via.placeholder.com/150", text: "Healthcare" },
    ],
    Versus: [{ img: "https://via.placeholder.com/150", text: "Versus" }],
  };
  const handleBackClick = () => {
    if (step === 0) {
      return;
    }
    setStep(step - 1);
  };
  const handlePurposeClick = (purpose) => {
    setSelectedPurpose(purpose);
    setStep(1);
  };

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
    setStep(2);
  };

  const navigate = useNavigate();

  const handleSubThemeClick = (subTheme) => {
    navigate("/storypage", { state: { selectedSubTheme: subTheme } });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "2rem", backgroundColor: "#F7F7F7" }}>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          Purpose Page
        </h1>
        <Container maxWidth="md">
          <Box textAlign="left" mb={2}>
            <Button
              variant="outlined"
              onClick={handleBackClick}
              disabled={step === 0}
            >
              Back
            </Button>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            {step === 0 && (
              <>
                {/* Render purpose icons */}
                <Typography variant="h6" align="center">
                  Purposes
                </Typography>
                {icons.map((icon, index) => (
                  <Grid item xs={4} sm={4} key={index}>
                    <Box
                      onClick={() => handlePurposeClick(icon.text)}
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
                          width: 100,
                          height: 100,
                          cursor: "pointer",
                        }}
                      />
                      <Typography variant="subtitle1" align="center">
                        {icon.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </>
            )}

            {step === 1 && (
              <>
                {/* Render theme icons */}
                <Typography variant="h6" align="center">
                  {selectedPurpose} Themes
                </Typography>
                {commonThemes.map((icon, index) => (
                  <Grid item xs={4} sm={4} key={index}>
                    <Box
                      onClick={() => handleThemeClick(icon.text)}
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
                          width: 100,
                          height: 100,
                          cursor: "pointer",
                        }}
                      />
                      <Typography variant="subtitle1" align="center">
                        {icon.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </>
            )}

            {step === 2 && (
              <>
                {/* Render sub-theme icons */}
                <Typography variant="h6" align="center">
                  {selectedTheme} Sub-themes
                </Typography>
                {subThemes[selectedTheme].map((icon, index) => (
                  <Grid item xs={4} sm={4} key={index}>
                    <Box
                      onClick={() => handleSubThemeClick(icon.text)}
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
                          width: 100,
                          height: 100,
                          cursor: "pointer",
                        }}
                      />
                      <Typography variant="subtitle1" align="center">
                        {icon.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default PurposePage;
