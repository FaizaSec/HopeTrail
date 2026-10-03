import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

//new imports
import { co2 } from "@tgwf/co2";

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

//new code for CO2 calculation
const co2Emission = new co2({ model: "swd" });
let totalBytes = 0;
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
// CO2 calculation middleware
// =========================
// Carbon Footprint Tracker
// =========================
app.use((req, res, next) => {
  let responseBytes = 0;

  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk, ...args) {
    if (chunk) {
      responseBytes += Buffer.isBuffer(chunk)
        ? chunk.length
        : Buffer.byteLength(chunk);
    }

    return originalWrite.call(this, chunk, ...args);
  };

  res.end = function (chunk, ...args) {
    if (chunk) {
      responseBytes += Buffer.isBuffer(chunk)
        ? chunk.length
        : Buffer.byteLength(chunk);
    }

    return originalEnd.call(this, chunk, ...args);
  };

  res.on("finish", () => {
    const contentLength = res.getHeader("content-length");

    if (contentLength) {
      totalBytes += Number(contentLength);
    } else {
      totalBytes += responseBytes;
    }
  });

  next();
});
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
//carbon footprint calculation
process.on("SIGINT", () => {
  const emissions = co2Emission.perByte(totalBytes, false);

  console.log(`
===== HopeTrail Carbon Footprint =====
Bytes Transferred: ${totalBytes} bytes
Estimated CO₂: ${emissions.toFixed(4)} grams (~${Math.round(
    emissions * 1000
  )} mg)
Sustainability Model: @tgwf/co2
======================================
`);

  process.exit(0);
});
