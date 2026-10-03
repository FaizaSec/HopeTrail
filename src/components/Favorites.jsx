import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Check logged-in user
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        // User is not logged in
        if (!response.ok) {
          alert("Please sign in first to view your favorites!");
          navigate("/");
          return;
        }

        const userData = await response.json();
        const user = userData.user || userData;

        // 2. Admin cannot access Favorites
        if (user.role === "admin") {
          alert("To view the favorite list, you have to be a general user.");
          navigate("/");
          return;
        }

        // 3. Normal user -> Fetch Favorite Pets
        const favResponse = await fetch(`${API_BASE_URL}/api/favorites`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        if (favResponse.ok) {
          const favData = await favResponse.json();

          setFavorites(
            Array.isArray(favData) ? favData : favData.favorites || [],
          );
        } else if (favResponse.status === 401 || favResponse.status === 403) {
          alert("Please sign in first to view your favorites!");
          navigate("/");
          return;
        } else {
          setError("Failed to load favorite pets.");
        }
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError("Something went wrong while loading favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="fav-page">
        <div className="fav-container">
          <p className="fav-loading-text">Loading your favorite pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fav-page">
      <div className="fav-container">
        {/* Header */}
        <div className="fav-header">
          <h2 className="fav-section-title">Your Favorite Pets</h2>

          <p className="fav-subtitle">
            Here are the pets you've saved for future adoption consideration.
          </p>
        </div>

        {/* Error */}
        {error && <div className="fav-error-msg">{error}</div>}

        {/* No favorites */}
        {favorites.length === 0 ? (
          <div className="fav-empty-box">
            <p>You haven't added any pets to your favorites yet.</p>

            <Link to="/dogs" className="fav-browse-link">
              Browse Pets
            </Link>
          </div>
        ) : (
          /* Favorite cards */
          <div className="fav-grid">
            {favorites.map((fav) => {
              const pet = fav.petId;

              if (!pet) return null;

              const petId = pet.id || pet._id;

              const speciesPath = pet.species
                ? `${pet.species.toLowerCase()}s`
                : "pets";

              return (
                <div key={fav._id} className="fav-card">
                  {/* Pet Image */}
                  {pet.image && (
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="fav-card-img"
                    />
                  )}

                  <div className="fav-card-content">
                    {/* Pet Name */}
                    <h3 className="fav-pet-name">{pet.name}</h3>

                    {/* Breed */}
                    <p className="fav-pet-info">
                      <strong>Breed:</strong> {pet.breed}
                    </p>

                    {/* Age */}
                    <p className="fav-pet-info">
                      <strong>Age:</strong> {pet.age}
                    </p>

                    {/* Details */}
                    <Link
                      to={`/${speciesPath}/${petId}`}
                      className="fav-details-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
