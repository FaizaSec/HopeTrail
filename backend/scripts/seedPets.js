// Run this ONCE to load the existing pets.json data into MongoDB:
//   node scripts/seedPets.js
//
// After this works, pets.json is no longer used by the app —
// petController.js reads from MongoDB instead.

import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Pet from "../models/Pet.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const petsPath = path.join(__dirname, "..", "data", "pets.json");
const pets = JSON.parse(fs.readFileSync(petsPath, "utf-8"));

async function seed() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");

    await Pet.deleteMany({}); // clear out any old test data first
    await Pet.insertMany(pets);

    console.log(`Seeded ${pets.length} pets into MongoDB`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
