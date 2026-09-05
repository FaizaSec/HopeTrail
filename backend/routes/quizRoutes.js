import express from "express";
import { getQuestions, submitQuiz } from "../controllers/quizController.js";
import Question from "../models/Question.js";

const router = express.Router();

router.get("/questions", getQuestions);
router.post("/submit", submitQuiz);

// Temporary route for adding questions
router.post("/add", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({
      message: "Error adding question",
    });
  }
});

export default router;