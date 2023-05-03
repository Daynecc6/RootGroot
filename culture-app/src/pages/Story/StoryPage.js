import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConversationsList from "./ConversationsList";
import QuestionsList from "./QuestionsList";
import FreeResponse from "./FreeResponse";
import { Box, Button, Grid, Typography } from "@mui/material";

const StoryPage = () => {
  const [story, setStory] = useState(null);
  const [currentConversationStep, setCurrentConversationStep] = useState(0);

  const location = useLocation();
  const selectedSubTheme = location.state.selectedSubTheme;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/stories?country=${encodeURIComponent(
            selectedSubTheme.country
          )}&purpose=${encodeURIComponent(
            selectedSubTheme.purpose
          )}&theme=${encodeURIComponent(
            selectedSubTheme.theme
          )}&subtheme=${encodeURIComponent(selectedSubTheme.subtheme)}`
        );
        if (!response.ok) {
          throw new Error("An error occurred while fetching the story data.");
        }
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStory();
  }, [selectedSubTheme]);

  const handleNextStep = () => {
    if (currentConversationStep < story.conversations.length - 1) {
      setCurrentConversationStep(currentConversationStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentConversationStep > 0) {
      setCurrentConversationStep(currentConversationStep - 1);
    }
  };

  return (
    <>
      {story ? (
        <Box mx="auto" my={4}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {story.title}
          </Typography>

          <Typography
            maxWidth={500}
            variant="body1"
            align="center"
            mx="auto"
            gutterBottom
          >
            {story.scenario}
          </Typography>

          <Box mt={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <ConversationsList
                  conversations={story.conversations}
                  currentConversationStep={currentConversationStep}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {currentConversationStep < story.conversations.length - 1 ? (
                  <Box textAlign="center" mt={4}>
                    <Button variant="contained" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    <Button variant="contained" onClick={handleNextStep} ml={2}>
                      Next
                    </Button>
                  </Box>
                ) : (
                  <>
                    <FreeResponse freeResponse={story.freeresp} />
                    <QuestionsList
                      questions={story.questions}
                      conversations={story.conversations}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </>
  );
};

export default StoryPage;
