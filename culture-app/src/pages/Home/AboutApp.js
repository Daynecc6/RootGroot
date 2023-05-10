import React from "react";
import { Box, Typography } from "@mui/material";

const AboutApp = () => {
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

      <Box m={2} p={2} borderRadius={8} border="1px solid #ddd" boxShadow={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph fontWeight="bold">
          Root & Groot app was developed to help people understand and
          appreciate the world's diverse cultures. The creator of the app
          recognized the need for a platform that would allow users to learn
          about different cultures from the comfort of their own homes. The
          app's background is rooted in the idea that cultural exchange is
          essential for building bridges and promoting understanding between
          different communities.
        </Typography>
      </Box>
      <Box m={2} p={2} borderRadius={8} border="1px solid #ddd" boxShadow={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Inclusion and Celebration
        </Typography>
        <Typography variant="body1" fontWeight="bold" paragraph>
          Over the years, many cultures have become marginalized or excluded
          from mainstream society. Root & Groot app aims to change this by
          providing a space where people can learn about and celebrate all
          cultures. Users of the app will be able to explore different cultural
          practices and beliefs, engage with immersive content, and connect with
          experts in various fields.
        </Typography>
      </Box>
      <Box m={2} p={2} borderRadius={8} border="1px solid #ddd" boxShadow={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Learn and Discover
        </Typography>
        <Typography variant="body1" paragraph fontWeight="bold">
          The app will feature sections on different cultures, allowing users to
          discover the history, traditions, and customs of various communities.
          The goal of Root & Groot is to foster mutual respect and cultural
          appreciation through education and exposure. It will provide users
          with tools and resources to deepen their knowledge and understanding
          of cultures around the world.
        </Typography>
      </Box>
      <Box m={2} p={2} borderRadius={8} border="1px solid #ddd" boxShadow={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Building Bridges
        </Typography>
        <Typography variant="body1" paragraph fontWeight="bold">
          Ultimately, the app aims to facilitate cross-cultural conversations
          and promote empathy and kindness towards diverse communities. By using
          Root & Groot, users can connect with people from different cultural
          backgrounds and learn from one another, leading to a more inclusive
          and understanding world.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutApp;
