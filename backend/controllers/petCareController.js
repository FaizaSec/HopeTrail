import PetCare from "../models/PetCare.js";

export const getPetCareServices = async (req, res) => {
  try {
    const services = await PetCare.find().sort({ area: 1, name: 1 });

    res.json(services);
  } catch (error) {
    console.error("Error fetching pet care services:", error);
    res.status(500).json({
      message: "Error fetching pet care services",
    });
  }
};
