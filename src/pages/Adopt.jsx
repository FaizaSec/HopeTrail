import { Link } from "react-router";

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
            <img
              src="/quiz-pets.jpg"
              alt="Pets looking for a home"
            />
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
      <div className="adoption-info"> 
        <div className="adoption-card"> 
          <h3>🏠 Prepare Your Home</h3> 
          <p> Make sure your home is safe and comfortable before
             bringing a pet home. Prepare food, water, bedding and
              a suitable space for your new companion.
          </p> 
        </div> 
        <div className="adoption-card"> 
          <h3>❤️ Be Ready for a Commitment</h3>
           <p> Pets need love, attention and daily care.
             Adoption is a long-term responsibility, so make sure you
              are ready to care for your pet throughout its life. 
           </p> 
        </div> 
        <div className="adoption-card">
           <h3>🍽️ Provide Proper Care</h3> 
           <p> Give your pet suitable food, fresh water, exercise,
             grooming and regular veterinary care according to their needs.
           </p> 
        </div>
        <div className="adoption-card"> 
          <h3>👨‍👩‍👧 Consider Your Family</h3>
          <p> Everyone in the household should be comfortable with the decision
             to adopt and understand the responsibilities of caring for a pet. 
          </p>
        </div> 
      </div> 
      <div className="adoption-caution"> 
        <h3>⚠️ Important Things to Remember</h3> 
        <ul>
           <li> Do not adopt a pet only because it looks cute.
           </li> 
             
          <li> Learn about the pet's age, health, behavior and special 
            needs before adopting. 
          </li> 
          <li> Give your new pet time and patience while adjusting to its new home.
          </li>

          <li> Never abandon a pet when caring for it becomes difficult. 
          </li>

          <li> Contact a veterinarian if your pet becomes sick or shows unusual behavior.
          </li>

          <li> Always treat your pet with kindness, patience and respect.
          </li> 
        </ul> 
      </div> 
    </div>
  );
}

export default Adopt;