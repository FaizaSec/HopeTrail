import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { fetchPetById } from "../data/petsData";
import "./Hopetrail.css";

const Row = ({ icon, children, wide }) => (
  <div className={`ht-detail-row ${wide ? "is-wide" : ""}`}>
    <span className="ht-detail-icon">{icon}</span>

    <span>{children}</span>
  </div>
);

const Check = ({ label, value }) => (
  <div className="ht-detail-row" style={{ paddingLeft: "30px" }}>
    <span>
      <strong>{label}:</strong> {value ? "Yes" : "No"}
    </span>
  </div>
);

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    fetchPetById(id)
      .then((data) => {
        if (!ignore) {
          setPet(data);
        }
      })
      .catch((err) => {
        console.error(err);

        if (!ignore) {
          setPet(null);
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
  }, [id]);

  // Start adoption
  const handleStartAdoption = () => {
    if (!pet) {
      return;
    }

    navigate("/adopt-form", {
      state: {
        petId: pet._id || id,
        petName: pet.name,
      },
    });
  };

  if (loading) {
    return (
      <div className="ht-page">
        <div className="ht-container">
          <p className="ht-empty">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="ht-page">
        <div className="ht-container ht-not-found">
          <h2>We couldn't find that pet on the trail.</h2>

          <Link to="/dogs" className="ht-back-link">
            Back to all dogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ht-page">
      {/* Back link */}
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
          {/* Pet Image */}
          <div className="ht-details-media">
            <img src={pet.image} alt={pet.name} />
          </div>

          {/* Pet Information */}
          <div className="ht-profile-card">
            <h1 className="ht-details-name">About {pet.name}</h1>

            <hr className="ht-divider" />

            {/* Breed */}
            <p className="ht-section-title">Breed</p>

            <Row>
              <strong>{pet.breed}</strong>
            </Row>

            {/* Physical Traits */}
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

            {/* Location */}
            <p className="ht-section-title ht-section-spaced">Location</p>

            <Row>
              <strong>{pet.location || "Dhaka"}</strong>
            </Row>

            {/* Behavior */}
            <p className="ht-section-title ht-section-spaced">Behavior</p>

            <Row>
              <strong>Personality</strong>
              <br />
              {pet.personality ? pet.personality.join(", ") : "Not specified"}
            </Row>

            <Check label="House-trained" value={pet.houseTrained} />

            {/* Health */}
            <hr className="ht-divider ht-section-spaced" />

            <p className="ht-section-title">Health</p>

            {/* Medical Condition */}
            <Row>
              <strong>Medical Condition:</strong>{" "}
              {pet.medicalCondition || "Healthy"}
            </Row>

            <Check label="Spayed/Neutered" value={pet.spayedNeutered} />

            <Check label="Vaccinated" value={pet.vaccinated} />

            {/* Adoption */}
            <button
              type="button"
              onClick={handleStartAdoption}
              className="ht-adopt-btn ht-section-spaced"
            >
              Start {pet.name}'s adoption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
