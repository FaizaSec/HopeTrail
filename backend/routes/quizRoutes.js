import express from "express";

import {
  getQuestions,
  getBreeds,
  submitQuiz,
} from "../controllers/quizController.js";

import Question from "../models/Question.js";
import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
// ONLY NORMAL USERS CAN TAKE THE QUIZ
const userOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admins cannot take the quiz",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
// QUIZ ROUTES
router.get("/questions", protect, userOnly, getQuestions);
router.get("/breeds", protect, userOnly, getBreeds);
router.post("/submit", protect, userOnly, submitQuiz);
// SETUP QUESTION IDs
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

    res.json({
      message: "Question IDs added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error setting question IDs",
    });
  }
});
// TEMPORARY ROUTE FOR ADDING QUESTIONS
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
