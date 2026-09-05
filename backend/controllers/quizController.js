import Question from "../models/Question.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching questions",
    });
  }
};

export const submitQuiz = async (req, res) => {
  const answers = req.body;

  console.log("Quiz answers:", answers);

  res.json({
    message: "Quiz submitted successfully!",
    answers,
  });
};