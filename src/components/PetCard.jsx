import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Hopetrail.css";

function PetCard({ pet, index }) {
  // Details page uses short ID: d1, d2, c1...
  const detailsId = pet?.id || pet?._id;

  // Favorites use MongoDB ObjectId
  const favoritePetId = pet?._id || pet?.id;

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";

  const markerNumber = String((index ?? 0) + 1).padStart(2, "0");

  const speciesPath = (pet?.species || "dog").toLowerCase();

  // Check whether this pet is already a favorite
  useEffect(() => {
    let isMounted = true;

    const checkFavorite = async () => {
      if (!favoritePetId) return;

      try {
        // First check whether the user is an admin
        const profileRes = await fetch(`${API_BASE_URL}/api/users/profile`, {
          credentials: "include",
        });

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const userRole = profileData.user?.role || profileData.role;

          if (userRole === "admin") {
            if (isMounted) {
              setIsFavorite(false);
            }
            return;
          }
        }

        const response = await fetch(`${API_BASE_URL}/api/favorites`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.status === 401 || response.status === 403) {
          if (isMounted) {
            setIsFavorite(false);
          }
          return;
        }

        if (!response.ok) return;

        const data = await response.json();

        const favoriteList = Array.isArray(data) ? data : data.favorites || [];

        const alreadyFavorite = favoriteList.some((fav) => {
          const favoritePet = fav.petId;

          if (!favoritePet) return false;

          return (
            String(favoritePet._id || "") === String(pet?._id || "") ||
            String(favoritePet.id || "") === String(pet?.id || "")
          );
        });

        if (isMounted) {
          setIsFavorite(alreadyFavorite);
        }
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavorite();

    return () => {
      isMounted = false;
    };
  }, [favoritePetId, pet?._id, pet?.id, API_BASE_URL]);

  // Add / Remove Favorite
  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading || !favoritePetId) return;

    setLoading(true);

    try {
      // Check logged-in user
      const profileResponse = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      // User is not logged in
      if (!profileResponse.ok) {
        alert("Please log in to add pets to your favorites!");
        navigate("/");
        return;
      }

      const userData = await profileResponse.json();
      const role = userData.user?.role || userData.role;

      // Admin cannot use favorites
      if (role === "admin") {
        alert("You need to be a user to add pets to your favorites!");
        setIsFavorite(false);
        return;
      }

      // Normal user -> toggle favorite
      const response = await fetch(`${API_BASE_URL}/api/favorites/toggle`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          petId: favoritePetId,
        }),
      });

      if (response.status === 401 || response.status === 403) {
        alert("Please log in to add pets to your favorites!");
        navigate("/");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to toggle favorite");
      }

      setIsFavorite(Boolean(data.isFavorite));
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!pet) return null;

  return (
    <Link
      to={`/${speciesPath}s/${detailsId}`}
      className="ht-card"
      style={{ position: "relative" }}
    >
      <span className="ht-card-marker">{markerNumber}</span>

      {/* Favorite Button */}
      <button
        type="button"
        onClick={handleToggleFavorite}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(255, 255, 255, 0.85)",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 2,
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isFavorite ? "#6512db" : "none"}
          stroke="#6512db"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <img
        className="ht-card-media"
        src={pet.thumbnail || pet.image}
        alt={pet.name || "Pet"}
      />

      <div className="ht-card-body">
        <h3 className="ht-card-name">{pet.name}</h3>

        <p className="ht-card-meta">
          {pet.breed} · {pet.age} · {pet.gender}
        </p>

        <p className="ht-card-tagline">{pet.tagline}</p>

        <span className="ht-card-cta">Meet {pet.name}</span>
      </div>
    </Link>
  );
}

export default PetCard;
