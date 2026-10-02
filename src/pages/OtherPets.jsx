import { Link } from "react-router";
import "./pages.css";

function OtherPets() {
  return (
    <div className="pet-info-page">
      <div className="pet-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Other Types of Pets</span>
      </div>

      <h1>Other Types of Pets Articles & Advice</h1>

      <div className="pet-top-section">
        <div className="pet-intro">
          <p>
            Welcome to our Other Types of Pets articles, your helpful resource
            for learning about pets beyond dogs and cats! Whether you are
            interested in birds, rabbits, or other companion animals, we've
            got you covered.
          </p>

          <p>
            Explore helpful information about different types of pets, from
            adoption and everyday care to health, behavior, and creating a
            safe and comfortable home for your companion.
          </p>

          <p>
            Currently we only have dogs and cats available for adoption, 
            but we are working to expand our services to include other
            types of pets in the future. Stay tuned for updates and new articles!
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

      <h2 className="articles-title">Articles & Advice</h2> 
      <div className="articles-grid"> 
        <article className="article-card">
         <h3>Choosing the Right Pet for Your Home</h3> 
         <p> Before adopting an animal, consider its space, daily care needs,
           personality, and the time you can dedicate to its well-being.
         </p>
        </article>
           <article className="article-card">
             <h3>Understanding Bird Care</h3>
              <p> Birds need a safe environment, suitable food, 
                clean water, and regular interaction. Learn about their 
                basic needs before bringing one home. 
              </p>
           </article> 
              <article className="article-card">
                 <h3>Rabbit Care Basics</h3>
                  <p> Rabbits need a clean living space, a suitable diet,
                     exercise, and gentle handling. Understanding their needs
                      helps them stay healthy and comfortable. 
                  </p> 
              </article>
              
             <article className="article-card">
               <h3>Preparing for a New Pet</h3>
                <p> Prepare your home before adoption by arranging food, 
                  bedding, appropriate supplies, and a safe space where your new
                   companion can settle in comfortably. 
                   
                </p>
             </article>
           </div> 
          </div>

  );
}

export default OtherPets;
