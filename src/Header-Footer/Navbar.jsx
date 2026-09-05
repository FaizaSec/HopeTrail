import "./Navbar.css";
import Login from "../Home-Auth/Login.jsx";
import SignUp from "../Home-Auth/SignUp.jsx";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router"; //changed dom by shova

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // ===== AUTH USER =====
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  // ===== FROM SHOVA =====
  const [aboutOpen, setAboutOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);

  const location = useLocation();

  // ===== FROM SHOVA =====
  // Close dropdowns when changing page
  useEffect(() => {
    setAboutOpen(false);
    setFindOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // ===== AUTH =====
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
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

        {/*Shovar menu*/}
        <div className={`links ${menuOpen ? "menu-open" : ""}`}>
          {/* ===== FROM SHOVA ===== */}
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
                {/* ===== FROM SHOVA ===== */}
                <Link to="/dogs-and-puppies">Dogs</Link>

                {/* ===== FROM SHOVA ===== */}
                <Link to="/cats-and-kittens">Cats</Link>

                {/* ===== FROM SHOVA ===== */}
                <Link to="/other-pets">Other Pets</Link>
              </div>
            )}
          </div>

          {/*All about pet by shova*/}
          {/* ===== FROM SHOVA ===== */}
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

        {/*from faiza*/}
        <div className="nav-actions">
          {user ? (
            <>
              <span>{user.name}</span>

              <button className="sign-in" onClick={handleLogout}>
                LOGOUT
              </button>
            </>
          ) : (
            <button className="sign-in" onClick={() => setShowSignIn(true)}>
              SIGN IN
            </button>
          )}
        </div>
      </nav>

      {/* ===== FROM SHOVA ===== */}
      {aboutOpen && (
        <div className="ribbon">
          <Link to="/adopt">ADOPT OR GET INVOLVED</Link>

          <Link to="/dogs-and-puppies">DOGS & PUPPIES</Link>

          <Link to="/cats-and-kittens">CATS & KITTENS</Link>

          <Link to="/other-pets">OTHER TYPES OF PETS</Link>
        </div>
      )}

      {/*from faiza*/}
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

      {showLogin && (
        <Login
          onClose={() => {
            setShowLogin(false);

            const savedUser = localStorage.getItem("user");

            if (savedUser) {
              setUser(JSON.parse(savedUser));
            }
          }}
        />
      )}

      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </>
  );
}

export default Navbar;
