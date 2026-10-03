import React, { useState, useEffect } from "react"; // attoja
//import Navbar from "../Header-Footer/Navbar.jsx";//removing this one also by Shova
//import Footer from "../Header-Footer/Footer.jsx";

import HomeImage from "../assets/backgroundPet.png";
import DogIcon from "../assets/dogIconImg.png";
import CatIcon from "../assets/catIconImg.png";
import { Link, useNavigate } from "react-router"; // attoja: useNavigate import kora holo
import "./HomePage.css";

function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";

  // Check user role once on component mount
  useEffect(() => {
    let isMounted = true; // prevent memory leak / duplicate updates

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          if (isMounted) {
            setUser(data.user);
          }
        } else {
          if (isMounted) {
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Check again periodically so login/logout changes are detected
    const interval = setInterval(fetchUser, 1000);

    return () => {
      isMounted = false;
    };
  }, [API_BASE_URL]);

  const handleFavoritesClick = (e) => {
    if (loading) return;

    // Jodi user log-in na thake ba admin na hoy
    if (!user) {
      e.preventDefault();
      alert("Please sign in first to view your favorites!");
      navigate("/");
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

          {/* Favorite e jawar jonno card (Hidden for admin, Attoja did this) */}
          {!loading && (!user || user.role !== "admin") && (
            <Link
              to="/favorites"
              className="favorite-card"
              onClick={handleFavoritesClick}
              /* attoja: added click handler for unauthenticated users */
            >
              <svg viewBox="0 0 24 24" fill="none" className="fav-svg-icon">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>

              <p>Favorites</p>
            </Link>
          )}
        </div>
      </section>

      {/*<Footer></Footer>*/
      /* Shova added this one to make the footer global*/}
    </>
  );
}

export default HomePage;
