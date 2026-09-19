import express from "express";

import {
  getQuestions,
  getBreeds,
  submitQuiz,
} from "../controllers/quizController.js";

import Question from "../models/Question.js";

const router = express.Router();

router.get("/questions", getQuestions);
router.get("/breeds", getBreeds);
router.post("/submit", submitQuiz);

router.post("/setup-ids", async (req, res) => {
  try {
    await Question.updateOne(
      { question: "What type of pet are you looking for?" },
      { $set: { id: "species" } },
    );

    await Question.updateOne(
      { question: "Who are you adopting for?" },
      { $set: { id: "purpose" } },
    );

    await Question.updateOne(
      { question: "What age would you prefer?" },
      { $set: { id: "age" } },
    );

    await Question.updateOne(
      { question: "What gender do you prefer?" },
      { $set: { id: "gender" } },
    );

    await Question.updateOne(
      { question: "Which breed do you prefer?" },
      { $set: { id: "breed" } },
    );

    res.json({ message: "Question IDs added successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Error setting question IDs",
    });
  }
});

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
