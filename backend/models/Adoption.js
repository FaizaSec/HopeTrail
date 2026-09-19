import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  petId: { type: String, required: true },
  petName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  housingType: { type: String, required: true },
  hasOtherPets: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

// same user r pet er ekadhik hobe na application
adoptionSchema.index({ user: 1, petId: 1 }, { unique: true });

const Adoption = mongoose.model("Adoption", adoptionSchema);
export default Adoption;
