import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StoryForm from "./StoryForm";
import Conversations from "./Conversations";
import Questions from "./Questions";
import { useStoryUploadForm } from "./useStoryUploadForm";
import Grid from "@mui/material/Grid";

function StoryUploadForm() {
  const {
    formData,
    handleChange,
    currentConversation,
    handleConversationChange,
    addConversation,
    deleteConversation,
    onDragEnd,
    handleSubmit,
    currentQuestion,
    handleQuestionChange,
    handleChoiceChange,
    handleAnswerChange,
    addQuestion,
    addChoice,
    deleteQuestion,
  } = useStoryUploadForm();

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        <Typography variant="h4">Upload Story</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StoryForm formData={formData} handleChange={handleChange} />
            {/* Add fields for conversations, questions, and answers as needed */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Conversations
              formData={formData}
              currentConversation={currentConversation}
              handleConversationChange={handleConversationChange}
              addConversation={addConversation}
              deleteConversation={deleteConversation}
              onDragEnd={onDragEnd}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Questions
              formData={formData}
              currentQuestion={currentQuestion}
              handleQuestionChange={handleQuestionChange}
              handleChoiceChange={handleChoiceChange}
              handleAnswerChange={handleAnswerChange}
              addChoice={addChoice}
              addQuestion={addQuestion}
              deleteQuestion={deleteQuestion}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 4, mb: 2 }}
            >
              Upload Story
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default StoryUploadForm;
