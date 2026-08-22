import { Link } from "react-router-dom";
import "./pages.css";

function Adopt() {
  return (
    <div className="adopt-page">

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Adopt Or Get Involved</span>
      </div>

      <h1>Adopt or Get Involved With Pets</h1>

      <div className="adopt-content">

        <div className="intro">
          Looking to adopt a furry companion or make a difference in
          the lives of animals? Our articles, crafted by experts,
          provide valuable insights on pet adoption, fostering and
          volunteering at animal shelters. Whether you're an experienced
          pet owner or adopting for the first time, we have the
          information you need to make informed decisions and get
          involved.
        </div>

        <div className="quiz-card">

          <div className="quiz-pets">
              <img src="/quiz-pets.jpg" alt="Pets looking for a home" />
            </div>

          <div className="quiz-info">

            <h2>Find Your Best Match</h2>

            <p>It only takes 60 seconds!</p>

            <Link to="/quiz">
              GET STARTED
            </Link>

          </div>

        </div>

      </div>

      <h2 className="about-title">
        About Pet Adoption
      </h2>

    </div>
  );
}

export default Adopt;