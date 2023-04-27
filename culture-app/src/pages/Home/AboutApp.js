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
      color="orange"
    >
      <Typography variant="h4" gutterBottom>
        About App
      </Typography>
      <Typography variant="body1">
        Culture is a rich tapestry of beliefs, traditions, values, and practices
        that define a group or society. It encompasses everything from language,
        food, music, art, and religion to social norms and etiquette. Root &
        Groot app was developed to help people understand and appreciate the
        world's diverse cultures. The creator of the app recognized the need for
        a platform that would allow users to learn about different cultures from
        the comfort of their own homes. The app's background is rooted in the
        idea that cultural exchange is essential for building bridges and
        promoting understanding between different communities. Over the years,
        many cultures have become marginalized or excluded from mainstream
        society. Root & Groot app aims to change this by providing a space where
        people can learn about and celebrate all cultures. Users of the app will
        be able to explore different cultural practices and beliefs, engage with
        immersive content, and connect with experts in various fields. The app
        will feature sections on different cultures, allowing users to discover
        the history, traditions, and customs of various communities. The goal of
        Root & Groot is to foster mutual respect and cultural appreciation
        through education and exposure. It will provide users with tools and
        resources to deepen their knowledge and understanding of cultures around
        the world. Ultimately, the app aims to facilitate cross-cultural
        conversations and promote empathy and kindness towards diverse
        communities.
      </Typography>
    </Box>
  );
};

export default AboutApp;
