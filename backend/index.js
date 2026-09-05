import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import cors from "cors";

import petRoutes from "./routes/PetRoutes.js";

const app = express();

//cors
app.use(cors());

app.use(express.json());

//authentication
app.use("/api/auth", authRoutes);

app.get("/api/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.use("/api/pets", petRoutes); //Attoja

//database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Error Connecting Database ${err}`));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
