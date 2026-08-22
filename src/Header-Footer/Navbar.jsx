import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";//changed dom by shova

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);

  
   // ===== FROM SHOVA =====
  const [aboutOpen, setAboutOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);

  const location = useLocation();

  // ===== FROM SHOVA =====
  // Close dropdowns when changing page
  useEffect(() => {
    setAboutOpen(false);
    setFindOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h2>HopeTrail</h2>
        </div>

        {/*Shovar menu*/}
        <div className="links">
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
                <Link to="/dogs-and-puppies">
                  Dogs
                </Link>

                {/* ===== FROM SHOVA ===== */}
                <Link to="/cats-and-kittens">
                  Cats
                </Link>

                {/* ===== FROM SHOVA ===== */}
                <Link to="/other-pets">
                  Other Pets
                </Link>

              </div>
            )}</div>
        
        {/*All about pet by shova*/} 
        {/* ===== FROM SHOVA ===== */}
          <button
            className="about"
            onClick={() => {
              setAboutOpen(!aboutOpen);
              setFindOpen(false);
            }}
          >
            ALL ABOUT PETS {aboutOpen ? "⌃" : "⌄"}
          </button>

        </div>

        <div className="nav-actions">
          <button className="sign-in" onClick={() => setShowSignIn(true)}>
            SIGN IN
          </button>
        </div>
      </nav>

      {/* ===== FROM SHOVA ===== */}
      {aboutOpen && (
        <div className="ribbon">

          <Link to="/adopt">
            ADOPT OR GET INVOLVED
          </Link>

          <Link to="/dogs-and-puppies">
            DOGS & PUPPIES
          </Link>

          <Link to="/cats-and-kittens">
            CATS & KITTENS
          </Link>

          <Link to="/other-pets">
            OTHER TYPES OF PETS
          </Link>

        </div>
      )}

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
              <button className="create-account-button">Create Account</button>

              <button className="login-button">Sign In</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
