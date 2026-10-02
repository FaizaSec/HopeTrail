import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Sidebar from "./Sidebar";
import PetCard from "./PetCard";
import { fetchAllPets } from "../data/petsData";
import "./Hopetrail.css";

const INITIAL_FILTERS = {
  breed: "All",
  age: [],
  size: [],
  gender: [],
  area: "All",
};

const getInitialFilters = () => ({
  breed: "All",
  age: [],
  size: [],
  gender: [],
  area: "All",
});

function PetGrid({ species, heading, eyebrow, noun }) {
  const [filters, setFilters] = useState(getInitialFilters);
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reset filters and search when species changes
  useEffect(() => {
    setFilters(getInitialFilters());
    setSearch("");
  }, [species]);

  // Fetch pets
  useEffect(() => {
    let ignore = false;

    setLoading(true);

    fetchAllPets(species)
      .then((data) => {
        if (!ignore) {
          setPets(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch pets:", err);

        if (!ignore) {
          setPets([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [species]);

  // Search text
  const searchText = useMemo(() => search.trim().toLowerCase(), [search]);

  // Breed options
  const breeds = useMemo(() => {
    return [...new Set(pets.map((pet) => pet.breed).filter(Boolean))].sort();
  }, [pets]);

  // Area options
  const areas = useMemo(() => {
    return [...new Set(pets.map((pet) => pet.location).filter(Boolean))].sort();
  }, [pets]);

  // Toggle age / size / gender
  const toggleValue = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];

      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        [key]: next,
      };
    });
  };

  // Search + filter pets
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Search by name or breed
      const searchMatch =
        !searchText ||
        pet.name?.toLowerCase().includes(searchText) ||
        pet.breed?.toLowerCase().includes(searchText);

      // Breed
      const breedMatch = filters.breed === "All" || pet.breed === filters.breed;

      // Age
      const ageMatch =
        filters.age.length === 0 || filters.age.includes(pet.age);

      // Size
      const sizeMatch =
        filters.size.length === 0 || filters.size.includes(pet.size);

      // Gender
      const genderMatch =
        filters.gender.length === 0 || filters.gender.includes(pet.gender);

      // Area
      const areaMatch = filters.area === "All" || pet.location === filters.area;

      return (
        searchMatch &&
        breedMatch &&
        ageMatch &&
        sizeMatch &&
        genderMatch &&
        areaMatch
      );
    });
  }, [pets, filters, searchText]);

  return (
    <div className="ht-page">
      {/* Hero */}
      <header className="ht-hero">
        <div className="ht-container">
          <Link to="/" className="ht-back-link">
            Back to home
          </Link>

          <p className="ht-eyebrow">{eyebrow}</p>

          <h1>{heading}</h1>

          <p>
            Browse {noun} waiting for a home and follow the trail to the one
            who's waiting for you.
            <span className="ht-hero-count">
              {filteredPets.length} {noun}
              {filteredPets.length === 1 ? "" : "s"} on the trail
            </span>
          </p>
        </div>
      </header>

      <div className="ht-container">
        {/* Search */}
        <div className="ht-search-box">
          <input
            type="text"
            placeholder={`Search ${noun} by name or breed...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ht-search-input"
          />
        </div>

        <div className="ht-search-layout">
          {/* Sidebar */}
          <Sidebar
            breeds={breeds}
            areas={areas}
            filters={filters}
            onBreedChange={(breed) => {
              setFilters((prev) => ({
                ...prev,
                breed,
              }));
            }}
            onAreaChange={(area) => {
              setFilters((prev) => ({
                ...prev,
                area,
              }));
            }}
            onToggleValue={toggleValue}
            onReset={() => {
              setFilters(getInitialFilters());
              setSearch("");
            }}
          />

          {/* Pet Grid */}
          <section>
            {loading ? (
              <p className="ht-empty">Loading {noun}s...</p>
            ) : filteredPets.length === 0 ? (
              <p className="ht-empty">
                No {noun}s match your search or filters.
              </p>
            ) : (
              <div className="ht-grid">
                {filteredPets.map((pet, index) => (
                  <PetCard key={pet.id} pet={pet} index={index} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default PetGrid;
