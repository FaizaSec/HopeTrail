import { Link } from "react-router";
import "./pages.css";

function CatsAndKittens() {
  return (
    <div className="pet-info-page">
      {/* ===== PAGE HEADER ===== */}
      <div className="pet-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Cats & Kittens</span>
      </div>

      <h1>Cat & Kitten Articles & Advice</h1>

      {/* ===== INTRO + QUIZ ===== */}
      <div className="pet-top-section">
        <div className="pet-intro">
          <p>
            Welcome to our Cats & Kittens articles, your resource for everything
            feline! Whether you're looking for adoption advice, health
            information, behavior tips or help caring for a kitten, we've got
            you covered.
          </p>

          <p>
            Discover helpful information about cats and kittens, from finding
            the right companion to understanding their behavior and keeping them
            happy and healthy.
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
export default CatsAndKittens;
