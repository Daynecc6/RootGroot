import React from "react";
import { useStory } from "./useStory";

const StoryPage = () => {
  const { selectedSubTheme, storyData, conversationIndex, handleNextClick } =
    useStory();

  return (
    <div>
      <h1>Story Page</h1>
      <h2>{selectedSubTheme}</h2>
      {storyData && (
        <>
          <p>{storyData.scenario_text}</p>
          <div>
            {storyData.conversations
              .slice(0, conversationIndex + 1)
              .map((conversation, index) => (
                <p key={index}>
                  <strong>{conversation.speaker}:</strong>{" "}
                  {conversation.message}
                </p>
              ))}
          </div>
          <button onClick={handleNextClick}>Next</button>
        </>
      )}
    </div>
  );
};

export default StoryPage;
