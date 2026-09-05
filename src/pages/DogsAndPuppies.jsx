import { Link } from "react-router";
import "./pages.css";

import DogIcon from "../assets/dogIconImg.png";

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
            Welcome to our Dogs & Puppies articles, your one-stop resource for
            all things canine! Whether you need training tips, advice on keeping
            your dog healthy and happy, or information on finding a dog for
            adoption, we've got you covered.
          </p>

          <p>
            Explore helpful information about dogs and puppies, from adoption
            and training to health, behavior and everyday care.
          </p>
        </div>

        <div className="quiz-card">
          <div className="quiz-pets">
            <img src="/quiz-pets.jpg" alt="Pets looking for a home" />
          </div>

          <div className="quiz-info">
            <h2>Find Your Best Match</h2>

            <p>It only takes 60 seconds!</p>

            <Link to="/quiz">GET STARTED</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DogsAndPuppies;
