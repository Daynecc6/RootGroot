import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const StoryPage = () => {
  const location = useLocation();
  const selectedSubTheme = location.state.selectedSubTheme;
  const [storyData, setStoryData] = useState(null);
  const [conversationIndex, setConversationIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStory(selectedSubTheme);
      setStoryData(data);
    };
    fetchData();
  }, [selectedSubTheme]);

  const fetchStory = async (subtheme) => {
    const response = await fetch(`/api/story/${encodeURIComponent(subtheme)}`);
    const data = await response.json();
    return data;
  };

  const handleNextClick = () => {
    if (conversationIndex < storyData.conversations.length - 1) {
      setConversationIndex(conversationIndex + 1);
    }
  };

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
