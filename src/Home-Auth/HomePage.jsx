import React from "react"; // attoja
//import Navbar from "../Header-Footer/Navbar.jsx";//removing this one also by Shova
//import Footer from "../Header-Footer/Footer.jsx";

import HomeImage from "../assets/backgroundPet.png";
import DogIcon from "../assets/dogIconImg.png";
import CatIcon from "../assets/catIconImg.png";
import { Link, useNavigate } from "react-router"; // attoja: useNavigate import kora holo
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";

  // Check user role when Favorites is clicked
  const handleFavoritesClick = async (e) => {
    e.preventDefault();

    try {
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
        return;
      }

      const data = await response.json();
      const currentUser = data.user || data;

      // Admin cannot access Favorites
      if (currentUser.role === "admin") {
        alert("To view the favorite list, you have to be a general user.");
        return;
      }

      // Normal user
      navigate("/favorites");
    } catch (error) {
      console.error("Failed to check user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/*<Navbar></Navbar> {/*removing this one also by Shova*/}

      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
          ), url(${HomeImage})`,
        }}
      >
        <div className="hero-content">
          <h1>Find Your New Best Friend</h1>
          <p>Give a loving home to a pet in need.</p>
        </div>
      </section>

      {/*Attoja's work link route*/}
      <section className="lower-section">
        <div className="animal-cards">
          <Link to="/dogs" className="dog-card">
            <img src={DogIcon} alt="Dogs" />
            <p>Dogs</p>
          </Link>

          <Link to="/cats" className="cat-card">
            <img src={CatIcon} alt="Cats" />
            <p>Cats</p>
          </Link>

          {/* Favorites */}
          <Link
            to="/favorites"
            className="favorite-card"
            onClick={handleFavoritesClick}
          >
            <svg viewBox="0 0 24 24" fill="none" className="fav-svg-icon">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            <p>Favorites</p>
          </Link>
        </div>
      </section>

      {/*<Footer></Footer>*/
      /* Shova added this one to make the footer global*/}
    </>
  );
}

export default HomePage;
