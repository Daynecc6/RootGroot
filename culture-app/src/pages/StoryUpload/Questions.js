import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";

function Questions({
  formData,
  currentQuestion,
  handleQuestionChange,
  handleChoiceChange,
  handleAnswerChange,
  addChoice,
  addQuestion,
  deleteQuestion,
}) {
  return (
    <>
      <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
        <Typography variant="h6">Questions</Typography>
      </Box>
      <TextField
        fullWidth
        label="Question"
        name="question"
        value={currentQuestion.question}
        onChange={handleQuestionChange}
        sx={{ mt: 2, mb: 2 }}
      />
      {currentQuestion.choices.map((choice, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}
        >
          <Radio
            color="primary"
            checked={currentQuestion.answer === choice}
            onChange={handleAnswerChange}
            value={choice}
            name="correct-answer"
            inputProps={{ "aria-label": `Choice ${index + 1}` }}
          />
          <TextField
            fullWidth
            label={`Choice ${index + 1}`}
            value={choice}
            onChange={(event) => handleChoiceChange(event, index)}
          />
        </Box>
      ))}
      <Box display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={addChoice}
          sx={{ mt: 2, mb: 2, mr: 2 }}
        >
          Add Choice
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={addQuestion}
          sx={{ mt: 2, mb: 2 }}
        >
          Add Question
        </Button>
      </Box>

      <List sx={{ width: "100%" }}>
        {formData.questions.map((question, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={question.question}
              secondary={`Choices: ${question.choices.join(", ")}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteQuestion(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Questions;
