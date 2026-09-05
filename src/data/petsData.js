const API_BASE_URL = "http://localhost:4000/api/pets";

// GET /api/pets?species=dog  (or no species -> all pets)
export async function fetchAllPets(species) {
  const url = species ? `${API_BASE_URL}?species=${species}` : API_BASE_URL;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch pets");
  }

  return res.json();
}

// GET /api/pets/:id
export async function fetchPetById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`);

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Failed to fetch pet");
  }

  return res.json();
}
