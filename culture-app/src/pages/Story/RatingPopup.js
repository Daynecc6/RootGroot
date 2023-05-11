import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";

const RatingPopup = ({ isOpen, handleClose, userId }) => {
  const [rating, setRating] = useState(null);

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleFinish = async () => {
    // Save the rating to the database
    console.log("User rated the app:", rating);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("User not authenticated.");
        return;
      }

      const response = await fetch(
        "https://root-groot-webservice.onrender.com/api/update-user-rating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, rating }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user rating.");
      }

      console.log("User rating updated successfully.");
    } catch (error) {
      console.error("Error updating user rating:", error);
    }

    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Rate the app</DialogTitle>
      <DialogContent>
        <Box textAlign="center">
          <Typography variant="body1" mb={2}>
            How would you rate this app?
          </Typography>
          <Rating value={rating} onChange={handleRatingChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFinish} disabled={!rating}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingPopup;
