import Favorite from "../models/Favorite.js";

export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { petId } = req.body;

    if (!petId) {
      return res.status(400).json({
        message: "Pet ID is required",
      });
    }

    if (req.user.role === "admin") {
      return res.status(403).json({
        message: "Admins are not allowed to use favorites!",
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: userId,
      petId,
    });

    if (existingFavorite) {
      await Favorite.findByIdAndDelete(existingFavorite._id);

      return res.status(200).json({
        isFavorite: false,
        message: "Pet removed from favorites",
      });
    }

    const newFavorite = new Favorite({
      user: userId,
      petId,
    });

    await newFavorite.save();

    res.status(201).json({
      isFavorite: true,
      message: "Pet added to favorites",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getMyFavorites = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    if (req.user.role === "admin") {
      return res.status(403).json({
        message: "Admins are not allowed to use favorites!",
      });
    }

    const favorites = await Favorite.find({
      user: userId,
    }).populate("petId");

    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
