import express from "express";
//import { createAdoptionApplication } from "../controllers/adoptionController.js";
//---------------FAIZA REPLACE KORSE----------------
import {
  createAdoptionApplication,
  getAllAdoptionApplications,
  updateAdoptionStatus,
  getMyAdoptionApplications,
} from "../controllers/adoptionController.js";
//import { protect } from "../middlewares/authMiddleware.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST Route connected with Controller
router.post("/", protect, createAdoptionApplication);

//---------------faiza work-------------------
router.get("/my-applications", protect, getMyAdoptionApplications);
router.get("/", protect, adminOnly, getAllAdoptionApplications);
router.patch("/:id/status", protect, adminOnly, updateAdoptionStatus);

export default router;
