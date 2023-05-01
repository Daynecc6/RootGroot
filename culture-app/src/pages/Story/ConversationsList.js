import React from "react";

const ConversationsList = ({ conversations, currentConversationStep }) => (
  <ol>
    {conversations.slice(0, currentConversationStep + 1).map((conversation) => (
      <li key={conversation.id}>
        <strong>{conversation.speaker}:</strong> {conversation.message}
      </li>
    ))}
  </ol>
);

export default ConversationsList;
