// ===== FROM SHOVA =====
import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import PetCard from "../components/PetCard";

import "./pages.css";

function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
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
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (questions.length > 0 && current === 4) {
      fetch(
        `http://localhost:4000/api/quiz/breeds?species=${answers.species}`
      )
        .then((response) => response.json())
        .then((data) => {
          setBreeds(data);
        })
        .catch((error) => {
          console.error("Error fetching breeds:", error);
        });
    }
  }, [current, answers.species, questions.length]);

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

    const updatedAnswers = {
      ...answers,
      [question.id]: answer,
    };

    setAnswers(updatedAnswers);

    if (current < questions.length - 1) {
      const next = questions[current + 1];

      setCurrent(current + 1);
      setAnswer(updatedAnswers[next.id] || "");
    } else {
      try {
        console.log("WHAT I AM SENDING:", updatedAnswers);

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

        console.log("Recommendations:", data.recommendations);

        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      const previous = questions[current - 1];

      setCurrent(current - 1);
      setAnswer(answers[previous.id] || "");
    } else {
      navigate("/adopt");
    }
  };

  const handleAnswerChange = (value) => {
    setAnswer(value);

    if (question.id === "species") {
      setBreeds([]);

      setAnswers({
        ...answers,
        species: value,
        breed: "",
      });
    }
  };

  // SHOW RECOMMENDED PETS AFTER QUIZ
  if (recommendations.length > 0) {
    return (
      <div className="ht-page">
        <div className="ht-container">
          <div className="quiz-results">
            <p className="ht-eyebrow">YOUR MATCHES</p>

            <h1>Pets waiting for you</h1>

            <p>
              Based on your answers, here are some pets that match your
              preferences.
            </p>

            <div className="ht-grid">
              {recommendations.map((recommendation, index) => (
                <PetCard
                  key={recommendation.pet.id}
                  pet={recommendation.pet}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <button className="back-button" onClick={previousQuestion}>
        ← Back
      </button>

      <div className="quiz-box">
        <p className="progress">
          Question {current + 1} of {questions.length}
        </p>

        <h1>{question.question}</h1>

        <select
          value={answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        >
          <option value="">Select an option</option>

          {(question.id === "breed" ? breeds : question.options).map(
            (option) => (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>

        <button className="next-button" onClick={nextQuestion}>
          {current === questions.length - 1 ? "FINISH" : "NEXT"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;