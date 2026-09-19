import express from "express";
import { createAdoptionApplication } from "../controllers/adoptionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST Route connected with Controller
router.post("/", protect, createAdoptionApplication);

export default router;
