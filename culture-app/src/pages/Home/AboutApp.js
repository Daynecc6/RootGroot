import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ScrollTrigger from "react-scroll-trigger";

const AboutApp = () => {
  const [visibleBoxes, setVisibleBoxes] = useState({});

  const onBoxEnter = (boxId) => {
    setVisibleBoxes((prev) => ({
      ...prev,
      [boxId]: true,
    }));
  };

  const content = [
    {
      title: "Our Mission",
      text: "Root & Groot app was developed to help people understand and appreciate the world's diverse cultures. The creator of the app recognized the need for a platform that would allow users to learn about different cultures from the comfort of their own homes. The app's background is rooted in the idea that cultural exchange is essential for building bridges and promoting understanding between different communities.",
    },
    {
      title: "Inclusion and Celebration",
      text: "Over the years, many cultures have become marginalized or excluded from mainstream society. Root & Groot app aims to change this by providing a space where people can learn about and celebrate all cultures. Users of the app will be able to explore different cultural practices and beliefs, engage with immersive content, and connect with experts in various fields.",
    },
    {
      title: "Learn and Discover",
      text: "The app will feature sections on different cultures, allowing users to discover the history, traditions, and customs of various communities. The goal of Root & Groot is to foster mutual respect and cultural appreciation through education and exposure. It will provide users with tools and resources to deepen their knowledge and understanding of cultures around the world.",
    },
    {
      title: "Building Bridges",
      text: "Ultimately, the app aims to facilitate cross-cultural conversations and promote empathy and kindness towards diverse communities. By using Root & Groot, users can connect with people from different cultural backgrounds and learn from one another, leading to a more inclusive and understanding world.",
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      bgcolor="tertiary.main"
      color="#333"
      maxWidth="800px"
      mx="auto"
      p="20px"
    >
      <Typography
        variant="h1"
        fontWeight="bold"
        style={{ fontFamily: "Lobster" }}
      >
        About Root & Groot
      </Typography>
      {content.map(({ title, text }, index) => (
        <ScrollTrigger key={index} onEnter={() => onBoxEnter(index)}>
          <Box
            m={2}
            p={2}
            borderRadius={8}
            border="1px solid #ddd"
            boxShadow={3}
            style={{
              opacity: visibleBoxes[index] ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" paragraph fontWeight="bold">
              {text}
            </Typography>
          </Box>
        </ScrollTrigger>
      ))}
    </Box>
  );
};

export default AboutApp;
