import mongoose from "mongoose";

const petCareSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["Veterinary", "Animal Hospital", "Grooming", "Daycare", "Other"],
      required: true,
    },
    area: { type: String, required: true },
    address: { type: String, required: true },
    phone: String,
    description: String,
  },
  { timestamps: true },
);

export default mongoose.model("PetCare", petCareSchema);
