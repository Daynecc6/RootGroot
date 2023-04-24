import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const PurposePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

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

  const navigate = useNavigate();

  const handleSubThemeClick = (subTheme) => {
    navigate("/storypage", { state: { selectedSubTheme: subTheme } });
  };

  return (
    <div>
      <h1>Purpose Page</h1>
      <Container maxWidth="md">
        <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
          {icons.map((icon, index) => (
            <Grid item key={index} xs={6} sm={4} md={2}>
              <Box
                onClick={() => {
                  setSelectedPurpose(icon.text);
                  setSelectedTheme(null);
                }}
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
                    width: isSmallScreen ? 80 : 100,
                    height: isSmallScreen ? 80 : 100,
                    cursor: "pointer",
                  }}
                />
                {icon.text.split(" - ").map((part, i) => (
                  <Typography
                    key={i}
                    variant="subtitle1"
                    align="center"
                    display="block"
                  >
                    {part}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        {selectedPurpose && (
          <>
            <h2>{selectedPurpose} Themes</h2>
            <Grid
              container
              spacing={isSmallScreen ? 2 : 4}
              justifyContent="center"
            >
              {commonThemes.map((icon, index) => (
                <Grid item key={index} xs={6} sm={4} md={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt={icon.text}
                      src={icon.img}
                      onClick={() => {
                        setSelectedTheme(icon.text);
                      }}
                      sx={{
                        width: isSmallScreen ? 80 : 100,
                        height: isSmallScreen ? 80 : 100,
                        cursor: "pointer",
                      }}
                    />
                    <Typography variant="subtitle1" align="center">
                      {icon.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {selectedTheme && (
          <>
            <h3>{selectedTheme} Sub-themes</h3>
            <Grid
              container
              spacing={isSmallScreen ? 2 : 4}
              justifyContent="center"
            >
              {subThemes[selectedTheme].map((icon, index) => (
                <Grid item key={index} xs={6} sm={4} md={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt={icon.text}
                      src={icon.img}
                      onClick={() => handleSubThemeClick(icon.text)}
                      sx={{
                        width: isSmallScreen ? 80 : 100,
                        height: isSmallScreen ? 80 : 100,
                        cursor: "pointer",
                      }}
                    />
                    <Typography variant="subtitle1" align="center">
                      {icon.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default PurposePage;
