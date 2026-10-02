import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
  },
  { timestamps: true },
);

favoriteSchema.index({ user: 1, petId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
