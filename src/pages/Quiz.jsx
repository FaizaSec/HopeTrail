// ===== FROM SHOVA =====

import { useState } from "react";
import { useNavigate } from "react-router";
import "./pages.css";

const questions = [
  {
    question: "I would like to adopt",
    options: ["Dog", "Cat", "Bird", "Others"]
  },
  {
    question: "I am looking to adopt for",
    options: ["Myself", "My family"]
  },
  {
    question: "Age preference",
    options: [
      "A puppy",
      "A young dog",
      "An adult dog",
      "A senior dog"
    ]
  },
  {
    question: "I would like to adopt a",
    options: ["Female", "Male", "No preference"]
  },
  {
    question: "A breed that I really like",
    options: ["Golden Retriever", "Doberman"]
  }
];

function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");

  const question = questions[current];

  const nextQuestion = () => {
    if (!answer) return;

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setAnswer("");
    } else {
      alert("Quiz completed!");
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAnswer("");
    } else {
      navigate("/adopt");
    }
  };

  return (
    <div className="quiz-page">

      <button
        className="back-button"
        onClick={previousQuestion}
      >
        ← Back
      </button>

      <div className="quiz-box">

        <p className="progress">
          Question {current + 1} of {questions.length}
        </p>

        <h1>{question.question}</h1>

        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        >
          <option value="">
            Select an option
          </option>

          {question.options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <button
          className="next-button"
          onClick={nextQuestion}
        >
          {current === questions.length - 1
            ? "FINISH"
            : "NEXT"}
        </button>

      </div>

    </div>
  );
}

export default Quiz;