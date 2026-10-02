import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getMyFavorites,
  toggleFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

// GET /api/favorites - for getting user's fav list
router.get("/", protect, getMyFavorites);

// POST /api/favorites/toggle - for adding or deleting fav pets
router.post("/toggle", protect, toggleFavorite);

export default router;
