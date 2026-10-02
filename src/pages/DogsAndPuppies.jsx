import { Link } from "react-router";
import "./pages.css";

function DogsAndPuppies() {
  return (
    <div className="pet-info-page">
      <div className="pet-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Dogs & Puppies</span>
      </div>

      <h1>Dog & Puppy Articles & Advice</h1>

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
      <h2 className="articles-title">Articles & Advice</h2>

      <div className="articles-grid">
        <article className="article-card">
          <h3>Preparing Your Home for a New Dog</h3>
          <p>
            Before bringing a dog home, prepare a safe and comfortable space with
            food, water, bedding, toys, and other essentials. A calm environment
            can help your new companion settle in more easily.
          </p>
        </article>

        <article className="article-card">
          <h3>Basic Training for Puppies</h3>
          <p>
            Early training helps puppies learn good habits and build confidence.
            Start with simple commands, consistent routines, and positive
            reinforcement.
          </p>
        </article>

        <article className="article-card">
          <h3>Keeping Your Dog Healthy</h3>
          <p>
            Regular veterinary checkups, vaccinations, balanced nutrition, exercise,
            and proper grooming are important parts of keeping a dog healthy and
            active.
          </p>
        </article>

        <article className="article-card">
          <h3>Understanding Dog Behavior</h3>
          <p>
            Dogs communicate through body language, sounds, and behavior. Learning
            to recognize signs of comfort, fear, excitement, and stress can help
            you build a stronger relationship with your pet.
          </p>
        </article>
      </div>
    </div>
  );
}

export default DogsAndPuppies;
