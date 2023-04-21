import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const PurposePage = () => {
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

  const [selectedPurpose, setSelectedPurpose] = useState(null);

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
