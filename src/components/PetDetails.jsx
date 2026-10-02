import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import "./Hopetrail.css";

const Row = ({ icon, children, wide }) => (
  <div className={`ht-detail-row ${wide ? "is-wide" : ""}`}>
    {icon && <span className="ht-detail-icon">{icon}</span>}
    <span>{children}</span>
  </div>
);

const Check = ({ label, value }) => (
  <div className="ht-detail-row">
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
  const [userRole, setUserRole] = useState(null); // Added for admin/user role check

  const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    // Fetch Pet Details & User Profile concurrently
    const fetchData = async () => {
      try {
        const petRes = await fetch(`${API_BASE_URL}/api/pets/${id}`);
        const petData = await petRes.json();

        if (!petRes.ok) {
          throw new Error(petData.message || "Failed to fetch pet");
        }

        // Fetch user profile to check role
        const userRes = await fetch(`${API_BASE_URL}/api/users/profile`, {
          credentials: "include",
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          if (!ignore) {
            setUserRole(userData.user?.role);
          }
        }

        if (!ignore) {
          setPet(petData);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setPet(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [id, API_BASE_URL]);

  // Start adoption
  const handleStartAdoption = () => {
    if (!pet) return;

    if (userRole === "admin") {
      alert("Admins are not allowed to submit adoption applications!");
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
      <div
        className="ht-container ht-details-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            <img src={pet.image || pet.thumbnail} alt={pet.name} />
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
                <strong>{pet.age}</strong>

                {pet.ageRange && (
                  <span className="ht-detail-sub">({pet.ageRange})</span>
                )}
              </Row>

              <Row>
                <strong>{pet.gender}</strong>
              </Row>

              <Row>
                <strong>{pet.size}</strong>

                {pet.weightRange && (
                  <span className="ht-detail-sub">({pet.weightRange})</span>
                )}
              </Row>
            </div>

            {/* Location */}
            <p className="ht-section-title ht-section-spaced">Location</p>

            <Row>
              <strong>{pet.location || "Dhaka"}</strong>
            </Row>

            {/* Behavior */}
            <p className="ht-section-title ht-section-spaced">Behavior</p>

            {/* Personality */}
            <Row>
              <strong>Personality:</strong>{" "}
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
            {userRole === "admin" ? (
              <p
                className="ht-section-spaced"
                style={{ color: "red", fontWeight: "bold" }}
              >
                Admins are not allowed to submit adoption applications.
              </p>
            ) : (
              <button
                type="button"
                onClick={handleStartAdoption}
                className="ht-adopt-btn ht-section-spaced"
              >
                Start {pet.name}'s adoption
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
