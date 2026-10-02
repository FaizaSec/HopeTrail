import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import petRoutes from "./routes/PetRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import petCareRoutes from "./routes/petCareRoutes.js"; //new shova

const app = express();

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// cookie parser
app.use(cookieParser());

// authentication
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes); // new for profile

app.use("/api/pets", petRoutes); // Attoja
app.use("/api/adoptions", adoptionRoutes); // Attoja
app.use("/api/favorites", favoriteRoutes); // Attoja
app.use("/api/quiz", quizRoutes); // Shova
app.use("/api/pet-care", petCareRoutes); //Shova

// database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Error Connecting Database ${err}`));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
