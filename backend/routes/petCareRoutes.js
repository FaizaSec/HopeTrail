import express from "express";
import { getPetCareServices } from "../controllers/petCareController.js";

const router = express.Router();

router.get("/", getPetCareServices);

export default router;
