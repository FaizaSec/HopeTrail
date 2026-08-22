import React from "react";
import { useParams, Link } from "react-router";
import { fetchPetById } from "../data/petsData";
import Navbar from "../Header-Footer/Navbar";
import Footer from "../Header-Footer/Footer";
import "./Hopetrail.css";

const Row = ({ icon, children, wide }) => (
  <div className={`ht-detail-row ${wide ? "is-wide" : ""}`}>
    <span className="ht-detail-icon">{icon}</span>
    <span>{children}</span>
  </div>
);

const Check = ({ label, value }) => (
  <div className="ht-detail-row">
    <span className={`ht-check-icon ${value ? "is-yes" : "is-no"}`}>
      {value ? "✓" : "✕"}
    </span>
    <span>
      <strong>{label}:</strong> {value ? "Yes" : "No"}
    </span>
  </div>
);

function PetDetails() {
  const { id } = useParams();

  const pet = fetchPetById(id);

  if (!pet) {
    return (
      <>
        <Navbar />
        <div className="ht-page">
          <div className="ht-container ht-not-found">
            <h2>We couldn't find that pet on the trail.</h2>
            <Link to="/dogs" className="ht-back-link">
              Back to all dogs
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="ht-page">
        <div className="ht-container ht-details-header">
          <Link
            to={pet.species === "cat" ? "/cats" : "/dogs"}
            className="ht-back-link"
          >
            Back to all {pet.species === "cat" ? "cats" : "dogs"}
          </Link>
        </div>

        <div className="ht-container">
          <div className="ht-details">
            <div className="ht-details-media">
              <img src={pet.image} alt={pet.name} />
            </div>

            <div className="ht-profile-card">
              <h1 className="ht-details-name">About {pet.name}</h1>
              <hr className="ht-divider" />

              <p className="ht-section-title">Breed</p>
              <Row>
                <strong>{pet.breed}</strong>
              </Row>

              <p className="ht-section-title ht-section-spaced">
                Physical Traits
              </p>
              <div className="ht-detail-grid">
                <Row>
                  <strong>{pet.age}</strong>{" "}
                  <span className="ht-detail-sub">({pet.ageRange})</span>
                </Row>
                <Row>
                  <strong>{pet.gender}</strong>
                </Row>
                <Row>
                  <strong>{pet.size}</strong>{" "}
                  <span className="ht-detail-sub">({pet.weightRange})</span>
                </Row>
              </div>

              <p className="ht-section-title ht-section-spaced">Behavior</p>
              <Row>
                <strong>Personality</strong>
                <br />
                {pet.personality.join(", ")}
              </Row>
              <Check label="House-trained" value={pet.houseTrained} />

              <hr className="ht-divider ht-section-spaced" />

              <p className="ht-section-title">Health</p>
              <Check label="Spayed/Neutered" value={pet.spayedNeutered} />
              <Check label="Vaccinated" value={pet.vaccinated} />

              <button type="button" className="ht-adopt-btn ht-section-spaced">
                Start {pet.name}'s adoption
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PetDetails;
