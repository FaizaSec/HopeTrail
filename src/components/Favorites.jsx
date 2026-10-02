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
        // 1. Check User Profile & Role
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/");
          return;
        }

        const userData = await response.json();
        const user = userData.user || userData;

        if (user.role === "admin") {
          navigate("/");
          return;
        }

        // 2. Fetch Favorite Pets
        const favResponse = await fetch(`${API_BASE_URL}/api/favorites`, {
          credentials: "include",
        });

        if (favResponse.ok) {
          const favData = await favResponse.json();
          setFavorites(
            Array.isArray(favData) ? favData : favData.favorites || [],
          );
        } else {
          setError("Failed to load favorite pets.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading favorites.");
      } finally {
        setLoading(false); // Loading sesh kore dewa holo
      }
    };

    fetchData();
  }, [API_BASE_URL, navigate]);

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
        <div className="fav-header">
          <h2 className="fav-section-title">Your Favorite Pets</h2>
          <p className="fav-subtitle">
            Here are the pets you've saved for future adoption consideration.
          </p>
        </div>

        {error && <div className="fav-error-msg">{error}</div>}

        {favorites.length === 0 ? (
          <div className="fav-empty-box">
            <p>You haven't added any pets to your favorites yet.</p>
            <Link to="/dogs" className="fav-browse-link">
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="fav-grid">
            {favorites.map((fav) => {
              const pet = fav.petId;
              if (!pet) return null;

              return (
                <div key={fav._id} className="fav-card">
                  {pet.image && (
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="fav-card-img"
                    />
                  )}
                  <div className="fav-card-content">
                    <h3 className="fav-pet-name">{pet.name}</h3>
                    <p className="fav-pet-info">
                      <strong>Breed:</strong> {pet.breed}
                    </p>
                    <p className="fav-pet-info">
                      <strong>Age:</strong> {pet.age}
                    </p>

                    <Link
                      to={`/${pet.species ? pet.species.toLowerCase() + "s" : "pets"}/${pet.id || pet._id}`}
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
