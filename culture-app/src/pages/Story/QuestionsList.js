import React from "react";

const QuestionsList = ({ questions }) => (
  <ol>
    {questions.map((question) => (
      <li key={question.id}>
        <p>{question.question_text}</p>
        <ol type="A">
          {question.choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ol>
      </li>
    ))}
  </ol>
);

export default QuestionsList;
