import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
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
    location: String,
    medicalCondition: String,
    personality: [String],
    houseTrained: Boolean,
    spayedNeutered: Boolean,
    vaccinated: Boolean,
  },
  { timestamps: true },
);

export default mongoose.model("Pet", petSchema);
