import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

const CompletedStories = ({ completedStories }) => {
  const storyIds = completedStories ? completedStories.split(",") : [];
  const [storyBadges, setStoryBadges] = useState([]);

  useEffect(() => {
    const fetchStoryBadges = async () => {
      try {
        if (storyIds.length > 0) {
          const promises = storyIds.map((storyId) =>
            fetch(`http://localhost:3001/api/stories?story_id=${storyId}`)
          );
          const responses = await Promise.all(promises);
          const data = await Promise.all(
            responses.map((response) => response.json())
          );
          const badges = data.map((story) => story.subtheme);
          setStoryBadges(badges);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStoryBadges();
  }, [storyIds]);

  return (
    <Grid container spacing={2}>
      {storyIds.map((storyId, index) => (
        <Grid item key={index}>
          <Typography>
            Story ID: {storyId} {storyBadges[index]}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompletedStories;
