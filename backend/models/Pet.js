import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    // We keep our own short "id" (d1, c1, etc.) alongside Mongo's
    // built-in _id, so the frontend doesn't need to change at all.
    id: { type: String, required: true, unique: true },
    species: { type: String, enum: ["dog", "cat"], required: true },
    name: { type: String, required: true },
    breed: String,
    age: String,
    ageRange: String,
    gender: String,
    size: String,
    weightRange: String,
    thumbnail: String,
    image: String,
    tagline: String,
    personality: [String],
    houseTrained: Boolean,
    spayedNeutered: Boolean,
    vaccinated: Boolean,
  },
  { timestamps: true },
);

export default mongoose.model("Pet", petSchema);
