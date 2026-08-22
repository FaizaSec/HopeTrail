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

      {/* ===== DOG ADOPTION ===== */}
      <ArticleSection
        title="Dog Adoption"
        cards={[
          {
            image: "/dogIconImg.png",
            title: "Where Can You Adopt a Dog?"
          },
          {
            image: "/luna.png",
            title: "How to Adopt a Dog"
          },
          {
            image: "/miso.png",
            title: "Should You Adopt a Puppy?"
          }
        ]}
      />

      {/* ===== DOG BEHAVIOR ===== */}
      <ArticleSection
        title="Dog Behavior"
        cards={[
          {
            image: "/olive.png",
            title: "Understanding Dog Behavior"
          },
          {
            image: "/rocket.png",
            title: "Why Dogs Get Anxious"
          },
          {
            image: "/simba.png",
            title: "Helping Your Dog Adjust"
          }
        ]}
      />

      {/* ===== HEALTH ===== */}
      <ArticleSection
        title="Dog Health & Wellness"
        cards={[
          {
            image: "/luna.png",
            title: "Keeping Your Dog Healthy"
          },
          {
            image: "/miso.png",
            title: "Grooming Tips for Dogs"
          },
          {
            image: "/olive.png",
            title: "Important Dog Health Tips"
          }
        ]}
      />

      {/* ===== TRAINING ===== */}
      <ArticleSection
        title="Dog Training"
        cards={[
          {
            image: "/rocket.png",
            title: "Getting Started With Training"
          },
          {
            image: "/simba.png",
            title: "Training Your Puppy"
          },
          {
            image: "/dogIconImg.png",
            title: "Building Good Habits"
          }
        ]}
      />

      {/* ===== SHELTER SEARCH ===== */}
      <ShelterSearch />

    </div>
  );
}


/* ===== REUSABLE ARTICLE SECTION ===== */

function ArticleSection({ title, cards }) {
  return (
    <section className="article-section">

      <div className="section-heading">
        <h2>{title}</h2>

        <Link to="#">
          VIEW ALL →
        </Link>
      </div>

      <div className="article-grid">

        {cards.map((card, index) => (
          <article className="article-card" key={index}>

            <img src={card.image} alt={card.title} />

            <div className="article-card-content">
              <p>Dogs & Puppies</p>
              <h3>{card.title}</h3>
            </div>

          </article>
        ))}

      </div>

    </section>
  );
}


/* ===== SHELTER SEARCH ===== */

function ShelterSearch() {
  return (
    <section className="shelter-search">

      <h2>Search for Animal Shelters or Rescues</h2>

      <div className="search-fields">

        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter City, State, or ZIP"
          />
        </div>

        <div>
          <label>Shelter or Rescue Name</label>
          <input
            type="text"
            placeholder="Enter name"
          />
        </div>

        <button>SEARCH</button>

      </div>

    </section>
  );
}

export default DogsAndPuppies;