import Navbar from "../Header-Footer/Navbar.jsx";//removing this one also by Shova
import Footer from "../Header-Footer/Footer.jsx";
import HomeImage from "../assets/backgroundPet.png";
import DogIcon from "../assets/dogIconImg.png";
import CatIcon from "../assets/catIconImg.png";
import { Link } from "react-router";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      {/*<Navbar></Navbar> {/*removing this one also by Shova*/}

      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${HomeImage})`,
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
            <img src={DogIcon} alt="Dogs"></img>
            <p>Dogs</p>
          </Link>
          <Link to="/cats" className="cat-card">
            <img src={CatIcon} alt="Cats"></img>
            <p>Cats</p>
          </Link>
        </div>
      </section>

       {/*<Footer></Footer>*/ /* Shova added this one to make the footer global*/}
    </>
  );
}

export default HomePage;
