import Pet from "../models/Pet.js";

// GET /api/pets?species=dog
// GET /api/pets            -> all pets (both species)
export async function getAllPets(req, res) {
  try {
    const { species } = req.query;
    const filter = species ? { species } : {};
    const pets = await Pet.find(filter);
    res.status(200).json(pets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch pets", error: err.message });
  }
}

// GET /api/pets/:id  (our short id, e.g. "d1", not Mongo's _id)
export async function getPetById(req, res) {
  try {
    const pet = await Pet.findOne({ id: req.params.id });

    if (!pet) {
      return res
        .status(404)
        .json({ message: `No pet found with id "${req.params.id}"` });
    }

    res.status(200).json(pet);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch pet", error: err.message });
  }
}
