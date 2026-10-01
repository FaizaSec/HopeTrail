import "./Navbar.css";
import Login from "../Home-Auth/Login.jsx";
import SignUp from "../Home-Auth/SignUp.jsx";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // ===== AUTH USER =====
  // LocalStorage theke user niye authentication korbo na.
  // Backend theke actual user information anbo.
  const [user, setUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  // ===== FROM SHOVA =====
  const [aboutOpen, setAboutOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);

  const location = useLocation();

  // ===== GET ACTUAL USER FROM BACKEND =====
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile",
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          // Token invalid / expired hole localStorage clear
          await fetch("http://localhost:4000/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });

          localStorage.removeItem("user");
          setUser(null);
          return;
        }

        // Backend/database theke actual user set hobe
        setUser(data.user);

        // Optional:
        // LocalStorage-eo actual user information update kore rakha
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        console.error("Navbar authentication error:", error);

        localStorage.removeItem("user");
        setUser(null);
      }
    };

    getCurrentUser();
  }, []);

  // ===== CLOSE DROPDOWNS WHEN PAGE CHANGES =====
  useEffect(() => {
    setAboutOpen(false);
    setFindOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // ===== AUTH LOGOUT =====
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className="logo">
          <h2>HopeTrail</h2>
        </div>

        {/* ===== FIND A PET ===== */}
        <div className={`links ${menuOpen ? "menu-open" : ""}`}>
          <div className="nav-item">
            <button
              onClick={() => {
                setFindOpen(!findOpen);
                setAboutOpen(false);
              }}
            >
              FIND A PET {findOpen ? "⌃" : "⌄"}
            </button>

            {findOpen && (
              <div className="dropdown">
                <Link to="/dogs-and-puppies">Dogs</Link>

                <Link to="/cats-and-kittens">Cats</Link>

                <Link to="/other-pets">Other Pets</Link>
              </div>
            )}
          </div>

          {/* ===== ALL ABOUT PETS ===== */}
          <div className="about-section">
            <button
              className="about"
              onClick={() => {
                setAboutOpen(!aboutOpen);
                setFindOpen(false);
              }}
            >
              ALL ABOUT PETS {aboutOpen ? "⌃" : "⌄"}
            </button>

            {aboutOpen && (
              <div className="mobile-ribbon">
                <Link to="/adopt">ADOPT OR GET INVOLVED</Link>

                <Link to="/dogs-and-puppies">DOGS & PUPPIES</Link>

                <Link to="/cats-and-kittens">CATS & KITTENS</Link>

                <Link to="/other-pets">OTHER TYPES OF PETS</Link>
              </div>
            )}
          </div>
        </div>

        {/* ===== AUTH USER ===== */}
        <div className="nav-actions">
          {user ? (
            <>
              <span>{user.name}</span>

              {user.role === "admin" ? (
                <Link to="/admin-dashboard" className="sign-in">
                  ADMIN DASHBOARD
                </Link>
              ) : (
                <Link to="/user-profile" className="sign-in">
                  USER PROFILE
                </Link>
              )}
            </>
          ) : (
            <button className="sign-in" onClick={() => setShowSignIn(true)}>
              SIGN IN
            </button>
          )}
        </div>
      </nav>

      {/* ===== ABOUT RIBBON ===== */}
      {aboutOpen && (
        <div className="ribbon">
          <Link to="/adopt">ADOPT OR GET INVOLVED</Link>

          <Link to="/dogs-and-puppies">DOGS & PUPPIES</Link>

          <Link to="/cats-and-kittens">CATS & KITTENS</Link>

          <Link to="/other-pets">OTHER TYPES OF PETS</Link>
        </div>
      )}

      {/* ===== SIGN IN PANEL ===== */}
      {showSignIn && (
        <>
          <div
            className="dark-overlay"
            onClick={() => setShowSignIn(false)}
          ></div>

          <div className="signin-panel">
            <button
              className="close-button"
              onClick={() => setShowSignIn(false)}
            >
              x
            </button>

            <h2>Welcome to HopeTrail</h2>

            <p>
              Create an account to find your new best friend and keep track of
              pets you love.
            </p>

            <div className="signin-options">
              <button
                className="create-account-button"
                onClick={() => {
                  setShowSignIn(false);
                  setShowSignUp(true);
                }}
              >
                Create Account
              </button>

              <button
                className="login-button"
                onClick={() => {
                  setShowSignIn(false);
                  setShowLogin(true);
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </>
      )}

      {/* ===== LOGIN ===== */}
      {showLogin && (
        <Login
          onClose={() => {
            setShowLogin(false);

            // Login successful hole Login.jsx localStorage-e user save korbe.
            // Tarpor backend theke fresh/actual user niye asbo.
            const getLoggedInUser = async () => {
              try {
                const response = await fetch(
                  "http://localhost:4000/api/users/profile",
                  {
                    credentials: "include",
                  },
                );

                const data = await response.json();

                if (!response.ok) {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setUser(null);
                  return;
                }

                setUser(data.user);

                localStorage.setItem("user", JSON.stringify(data.user));
              } catch (error) {
                console.error("Login user fetch error:", error);

                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
              }
            };

            getLoggedInUser();
          }}
        />
      )}

      {/* ===== SIGN UP ===== */}
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </>
  );
}

export default Navbar;
