import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StorySubmission = () => {
  const [story, setStory] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://rootgroot-ht6a.onrender.com/api/story-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add the required authorization header, e.g.:
            // "Authorization": `Bearer ${yourAuthToken}`,
          },
          body: JSON.stringify({ story }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
      } else {
        // Navigate back to the world map after saving the story
        navigate("/world-map");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Submit Your Story</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="story">Story:</label>
        <textarea
          id="story"
          name="story"
          value={story}
          onChange={handleChange}
          rows="10"
          cols="50"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StorySubmission;
