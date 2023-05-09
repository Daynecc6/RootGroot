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
import { useLocation } from "react-router-dom";

const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const themeImages = importAll(
  require.context("../../assets/ThemeAvatars", false, /\.(png|jpe?g|svg)$/)
);

const purposeImages = importAll(
  require.context("../../assets/PurposeAvatars", false, /\.(png|jpe?g|svg)$/)
);

const subthemeImages = importAll(
  require.context("../../assets/SubthemeAvatars", false, /\.(png|jpe?g|svg)$/)
);

const PurposePage = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const countryData = location.state.selectedCountry.cca3;

  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [step, setStep] = useState(0);

  const icons = [
    {
      img: purposeImages["Business.jpg"],
      text: "It's my... - Business",
    },
    {
      img: purposeImages["Storyhunter.png"],
      text: "Tell me more! - Story-hunter",
    },
    {
      img: purposeImages["Storyteller.png"],
      text: "Once upon a time... - Storyteller",
    },
    {
      img: purposeImages["Study.jpg"],
      text: "Have fun! - Study",
    },
    {
      img: purposeImages["Travel.png"],
      text: "Let's go! - Travel",
    },
    {
      img: purposeImages["Volunteer.jpg"],
      text: "I am here for you. - Volunteer",
    },
  ];
  const commonThemes = [
    { img: themeImages["Beliefs.png"], text: "Beliefs" },
    { img: themeImages["Development.png"], text: "Development" },
    { img: themeImages["Education.png"], text: "Education" },
    { img: themeImages["Healthcare.png"], text: "Healthcare" },
    { img: themeImages["Life Impact.png"], text: "Life Impact" },
    { img: themeImages["Politics.png"], text: "Politics" },
    { img: themeImages["Regulation.png"], text: "Regulation" },
    { img: themeImages["Skills.png"], text: "Skills" },
    { img: themeImages["Social Circle.jpg"], text: "Social Circle" },
    { img: themeImages["Social Impact.png"], text: "Social Impact" },
    { img: themeImages["Versus.png"], text: "Versus" },
  ];

  const subThemes = {
    "Social Circle": [
      { img: subthemeImages["Relationship.jpg"], text: "Relationship" },
      { img: subthemeImages["Family.jpg"], text: "Family" },
      { img: subthemeImages["Community.png"], text: "Community" },
    ],
    "Life Impact": [
      {
        img: subthemeImages["Personal sensation.png"],
        text: "Personal Sensation",
      },
      {
        img: subthemeImages["Physiological needs.png"],
        text: "Physiological Needs",
      },
      { img: subthemeImages["Challenges.png"], text: "Challenges" },
      { img: subthemeImages["Consumption.png"], text: "Consumption" },
    ],
    Skills: [
      { img: subthemeImages["Personal skills.png"], text: "Personal Skills" },
      {
        img: subthemeImages["Interpersonal skills.png"],
        text: "Interpersonal Skills",
      },
    ],
    Development: [
      {
        img: subthemeImages["Personal development.png"],
        text: "Personal Development",
      },
      {
        img: subthemeImages["Professional development.png"],
        text: "Professional Development",
      },
      {
        img: subthemeImages["Intercultural competence.png"],
        text: "Intercultural Competence",
      },
    ],
    Education: [{ img: themeImages["Education.png"], text: "Education" }],
    Beliefs: [{ img: themeImages["Beliefs.png"], text: "Beliefs" }],
    "Social Impact": [
      { img: subthemeImages["Social justice.png"], text: "Social Justice" },
      { img: subthemeImages["Human rights.png"], text: "Human Rights" },
    ],
    Politics: [{ img: themeImages["Politics.png"], text: "Politics" }],
    Regulation: [
      {
        img: themeImages["Regulation.png"],
        text: "Regulation",
      },
    ],
    Healthcare: [{ img: themeImages["Healthcare.png"], text: "Healthcare" }],
    Versus: [{ img: themeImages["Versus.png"], text: "Versus" }],
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
    navigate("/storypage", {
      state: {
        selectedSubTheme: {
          country: countryData,
          purpose: selectedPurpose,
          theme: selectedTheme,
          subtheme: subTheme,
        },
      },
    });
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
                      onClick={() =>
                        handlePurposeClick(icon.text.split(" - ")[1])
                      }
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
