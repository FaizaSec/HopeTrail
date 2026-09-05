// ===== FROM SHOVA =====
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./pages.css";

function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/quiz/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  if (loading || questions.length === 0) {
    return (
      <div className="quiz-page loading">
        <p>Loading questions...</p>
      </div>
    );
  }

  const question = questions[current];

  const nextQuestion = async () => {
    if (!answer) return;

    const updatedAnswers = [...answers, answer];

    if (current < questions.length - 1) {
      setAnswers(updatedAnswers);
      setCurrent(current + 1);
      setAnswer("");
    } else {
      try {
        const response = await fetch(
          "http://localhost:4000/api/quiz/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answers: updatedAnswers,
            }),
          }
        );

        const data = await response.json();
        console.log("Backend response:", data);

        alert("Quiz completed!");
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAnswer(answers[current - 1] || "");
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