import { Link } from "react-router";
import "./pages.css";

function DogsAndPuppies() {
  return (
    <div className="pet-info-page">

      {/* ===== PAGE HEADER ===== */}
      <div className="pet-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Dogs & Puppies</span>
      </div>

      <h1>Dog & Puppy Articles & Advice</h1>

      {/* ===== INTRO + QUIZ ===== */}
      <div className="pet-top-section">

        <div className="pet-intro">
          <p>
            Welcome to our Dogs & Puppies articles, your one-stop resource
            for all things canine! Whether you need training tips, advice
            on keeping your dog healthy and happy, or information on finding
            a dog for adoption, we've got you covered.
          </p>

          <p>
            Explore helpful information about dogs and puppies, from
            adoption and training to health, behavior and everyday care.
          </p>
        </div>

        <div className="match-card">

          <div className="match-images">
            <img src="/dogIconImg.png" alt="Dog" />
            <img src="/luna.png" alt="Dog" />
            <img src="/miso.png" alt="Dog" />
          </div>

          <div className="match-content">
            <h2>Find Your Best Match</h2>
            <p>It only takes 60 seconds!</p>

            <Link to="/quiz">
              GET STARTED
            </Link>
          </div>

          </div>
        </div>
      </div>
  );
}


export default DogsAndPuppies;