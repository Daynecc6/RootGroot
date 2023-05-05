import React, { useState, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RatingPopup from "./RatingPopup"; // Import the RatingPopup component

const QuestionsList = ({ questions, conversations, userId, storyId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultText, setResultText] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showRatingPopup, setShowRatingPopup] = useState(false); // Add a state variable for showing the rating popup
  const [userRating, setUserRating] = useState(null); // Add a state variable to store the user's rating

  const currentQuestion = questions[currentQuestionIndex];
  const currentStorySpeakerName = conversations[0].speaker;

  const navigate = useNavigate();

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitted(true);
    const selectedQuestion = questions[currentQuestionIndex];
    if (selectedQuestion.answer === selectedAnswer) {
      setResultText("Correct!");
      setShowExplanation(false);
      setScore(score + 1);
    } else {
      setResultText("Incorrect!");
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setResultText("");
    setShowExplanation(false);
  };

  const updateCompletedStories = async (userId, storyId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/update-completed-stories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            storyId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating completed stories.");
      }
    } catch (error) {
      console.error("Error updating completed stories:", error);
    }
  };

  const handleFinish = async () => {
    handleSubmit();
    setShowScore(true);
    await updateCompletedStories(userId, storyId);
    setShowRatingPopup(true);
  };

  const handleNextStory = () => {
    navigate("/world-map");
  };

  const fetchNextStoryBySpeaker = async (speakerName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/next-story-by-speaker?speakerName=${speakerName}`
      );
      if (response.ok) {
        const nextStory = await response.json();
        return nextStory;
      } else {
        console.error("Error fetching next story by speaker.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching next story by speaker:", error);
      return null;
    }
  };

  const handleNextStoryBySpeaker = (nextStoryId) => {
    navigate("/storypage", {
      state: {
        nextStoryId,
      },
    });
  };

  const handleCloseRatingPopup = () => {
    setShowRatingPopup(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }

        const userData = await response.json();
        setUserRating(userData.rating);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Box
      my={2}
      p={2}
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
      }}
    >
      <Box mb={1}>
        <Typography variant="h6" gutterBottom>
          {currentQuestion.question_text}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
          {currentQuestion.choices.map((choice, index) => (
            <FormControlLabel
              key={index}
              value={choice}
              control={<Radio />}
              label={`${String.fromCharCode(index + 65)}. ${choice}`}
            />
          ))}
        </RadioGroup>
        {isSubmitted && (
          <Box my={2}>
            <Chip
              label={resultText}
              color={resultText === "Correct!" ? "success" : "error"}
            />
            {showExplanation && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Explanation: {currentQuestion.explanation}
              </Typography>
            )}
          </Box>
        )}
        <Box textAlign="center">
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              type="submit"
              disabled={!selectedAnswer}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={!selectedAnswer || showScore}
              onClick={handleFinish}
            >
              Finish
            </Button>
          )}
          {currentQuestionIndex < questions.length - 1 && (
            <Button
              variant="contained"
              disabled={!isSubmitted || !selectedAnswer}
              onClick={handleNextQuestion}
              sx={{ ml: 2 }}
            >
              Next
            </Button>
          )}
        </Box>
        {showScore && (
          <Box my={2}>
            <Typography variant="h6">
              Your final score is {score}/{questions.length}
            </Typography>
            <Button
              variant="contained"
              onClick={handleNextStory}
              sx={{ mt: 2 }}
            >
              Next Story
            </Button>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={async () => {
                const nextStory = await fetchNextStoryBySpeaker(
                  currentStorySpeakerName
                );
                if (nextStory) {
                  handleNextStoryBySpeaker(nextStory);
                }
              }}
            >
              Another story by {currentStorySpeakerName}
            </Button>
          </Box>
        )}
        {showRatingPopup && userRating === null && (
          <RatingPopup
            isOpen={showRatingPopup}
            handleClose={handleCloseRatingPopup}
            userId={userId}
          />
        )}
      </form>
    </Box>
  );
};

export default QuestionsList;
