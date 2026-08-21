import "./Navbar.css";
import { useState } from "react";

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h2>HopeTrail</h2>
        </div>

        {/*Shovar menu*/}
        <div className="links">
          <a href="#">FIND A PET</a>
          <a href="#">ALL ABOUT PETS</a>
        </div>

        <div className="nav-actions">
          <button className="sign-in" onClick={() => setShowSignIn(true)}>
            SIGN IN
          </button>
        </div>
      </nav>

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
