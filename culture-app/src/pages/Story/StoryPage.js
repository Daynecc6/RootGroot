import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConversationsList from "./ConversationsList";
import QuestionsList from "./QuestionsList";
import FreeResponse from "./FreeResponse";

const StoryPage = () => {
  const [story, setStory] = useState(null);
  const [currentConversationStep, setCurrentConversationStep] = useState(0);

  const location = useLocation();
  const selectedSubTheme = location.state.selectedSubTheme;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/stories?country=US&purpose=Storyteller&theme=${encodeURIComponent(
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

  return (
    <div>
      {story ? (
        <>
          <h1>{story.title}</h1>
          <p>{story.scenario}</p>

          <h2>Conversations</h2>
          <ConversationsList
            conversations={story.conversations}
            currentConversationStep={currentConversationStep}
          />

          {currentConversationStep < story.conversations.length - 1 ? (
            <button onClick={handleNextStep}>Next</button>
          ) : (
            <>
              <h2>Questions</h2>
              <QuestionsList questions={story.questions} />

              <h2>Free response</h2>
              <FreeResponse freeResponse={story.freeresp} />
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StoryPage;
