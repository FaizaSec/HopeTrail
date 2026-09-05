import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import Sidebar from "./Sidebar";
import PetCard from "./PetCard";
import Navbar from "../Header-Footer/Navbar";
import Footer from "../Header-Footer/Footer";
import { fetchAllPets } from "../data/petsData";
import "./Hopetrail.css";

const INITIAL_FILTERS = { breed: "All", age: [], size: [], gender: [] };

function PetGrid({ species, heading, eyebrow, noun }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilters(INITIAL_FILTERS);
  }, [species]);

  // Fetch pets from the backend whenever the species changes.
  useEffect(() => {
    let ignore = false;

    setLoading(true);
    fetchAllPets(species)
      .then((data) => {
        if (!ignore) setPets(data);
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setPets([]);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [species]);

  const breeds = useMemo(
    () => [...new Set(pets.map((pet) => pet.breed).filter(Boolean))].sort(),
    [pets],
  );

  const toggleValue = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const breedMatch = filters.breed === "All" || pet.breed === filters.breed;
      const ageMatch =
        filters.age.length === 0 || filters.age.includes(pet.age);
      const sizeMatch =
        filters.size.length === 0 || filters.size.includes(pet.size);
      const genderMatch =
        filters.gender.length === 0 || filters.gender.includes(pet.gender);
      return breedMatch && ageMatch && sizeMatch && genderMatch;
    });
  }, [pets, filters]);

  return (
    <>
      {/*<Navbar />*/}
      <div className="ht-page">
        <header className="ht-hero">
          <div className="ht-container">
            <Link to="/" className="ht-back-link">
              Back to home
            </Link>
            <p className="ht-eyebrow">{eyebrow}</p>
            <h1>{heading}</h1>
            <p>
              Browse {noun} waiting for a home and follow the trail to the one
              who's waiting for you.{" "}
              <span className="ht-hero-count">
                {filteredPets.length} {noun}
                {filteredPets.length === 1 ? "" : "s"} on the trail
              </span>
            </p>
          </div>
        </header>

        <div className="ht-container">
          <div className="ht-search-layout">
            <Sidebar
              breeds={breeds}
              filters={filters}
              onBreedChange={(breed) =>
                setFilters((prev) => ({ ...prev, breed }))
              }
              onToggleValue={toggleValue}
              onReset={() => setFilters(INITIAL_FILTERS)}
            />

            <section>
              {loading ? (
                <p className="ht-empty">Loading {noun}s...</p>
              ) : filteredPets.length === 0 ? (
                <p className="ht-empty">
                  No {noun}s match those filters yet — try widening the trail.
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
      {/*<Footer />*/}
    </>
  );
}

export default PetGrid;
