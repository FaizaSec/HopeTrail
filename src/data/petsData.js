import bambi from "../assets/bambi.png";
import rocket from "../assets/rocket.png";
import miso from "../assets/miso.png";
import boulder from "../assets/boulder.png";

import luna from "../assets/luna.png";
import simba from "../assets/simba.png";
import olive from "../assets/olive.png";

const petsData = [
  // ---- Dogs ----
  {
    id: "d1",
    species: "dog",
    name: "Bambi",
    breed: "Labradoodle Mix",
    age: "Adult",
    ageRange: "3-8 years",
    gender: "Female",
    size: "Medium",
    weightRange: "26-60 lbs",
    thumbnail: bambi,
    image: bambi,
    tagline: "Sweet, gentle, and always up for a slow evening walk.",
    personality: ["Affectionate", "Quiet"],
    houseTrained: true,
    spayedNeutered: true,
    vaccinated: true,
  },
  {
    id: "d2",
    species: "dog",
    name: "Rocket",
    breed: "Siberian Husky",
    age: "Young",
    ageRange: "1-3 years",
    gender: "Male",
    size: "Large",
    weightRange: "60-90 lbs",
    thumbnail: rocket,
    image: rocket,
    tagline: "High energy, high loyalty — needs a hiking buddy.",
    personality: ["Energetic", "Smart"],
    houseTrained: true,
    spayedNeutered: true,
    vaccinated: true,
  },
  {
    id: "d3",
    species: "dog",
    name: "Miso",
    breed: "Free-ranging Mix",
    age: "Adult",
    ageRange: "2-5 years",
    gender: "Female",
    size: "Medium",
    weightRange: "15-25 lbs",
    thumbnail: miso,
    image: miso,
    tagline: "Independent spirit with a big personality.",
    personality: ["Independent", "Clever"],
    houseTrained: true,
    spayedNeutered: true,
    vaccinated: true,
  },
  {
    id: "d4",
    species: "dog",
    name: "Boulder",
    breed: "Golden Retriever",
    age: "Senior",
    ageRange: "8+ years",
    gender: "Male",
    size: "Large",
    weightRange: "100-140 lbs",
    thumbnail: boulder,
    image: boulder,
    tagline: "A gentle giant looking for a quiet retirement.",
    personality: ["Gentle", "Laid-back"],
    houseTrained: true,
    spayedNeutered: true,
    vaccinated: true,
  },

  // ---- Cats ----
  {
    id: "c1",
    species: "cat",
    name: "Luna",
    breed: "Domestic Shorthair",
    age: "Young",
    ageRange: "2-6 years",
    gender: "Female",
    size: "Small",
    weightRange: "8-12 lbs",
    thumbnail: luna,
    image: luna,
    tagline: "A window-watcher who purrs the moment you sit down.",
    personality: ["Affectionate", "Calm"],
    houseTrained: true,
    spayedNeutered: true,
    vaccinated: true,
  },
  {
    id: "c2",
    species: "cat",
    name: "Simba",
    breed: "Tabby",
    age: "Young",
    ageRange: "1-2 years",
    gender: "Male",
    size: "Medium",
    weightRange: "9-13 lbs",
    thumbnail: simba,
    image: simba,
    tagline: "Chases the laser pointer like it owes him money.",
    personality: ["Playful", "Curious"],
    houseTrained: true,
    spayedNeutered: true,
    vaccinated: true,
  },
  {
    id: "c3",
    species: "cat",
    name: "Olive",
    breed: "Persian",
    age: "Young",
    ageRange: "3-5 years",
    gender: "Female",
    size: "Small",
    weightRange: "6-9 lbs",
    thumbnail: olive,
    image: olive,
    tagline: "Talkative and opinionated — she'll let you know.",
    personality: ["Vocal", "Social"],
    houseTrained: true,
    spayedNeutered: true,
    vaccinated: true,
  },
];

export function fetchAllPets(species) {
  return species
    ? petsData.filter((pet) => pet.species === species)
    : [...petsData];
}

export function fetchPetById(id) {
  return petsData.find((pet) => pet.id === id) || null;
}

export default petsData;
