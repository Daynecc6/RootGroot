import React from "react";
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
      text: "Icon 1",
    },
    {
      img: "https://via.placeholder.com/150",
      text: "Icon 2",
    },
    {
      img: "https://via.placeholder.com/150",
      text: "Icon 3",
    },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <h1>Purpose Page</h1>
      <Container maxWidth="md">
        <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
          {icons.map((icon, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box
                onClick={() => {
                  console.log(`Clicked on: ${icon.text}`);
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
      </Container>
    </div>
  );
};

export default PurposePage;
