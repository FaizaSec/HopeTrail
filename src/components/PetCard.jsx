import React from "react";
import { Link } from "react-router";
import "./Hopetrail.css";

function PetCard({ pet, index }) {
  const markerNumber = String(index + 1).padStart(2, "0");

  return (
    <Link to={`/${pet.species}s/${pet.id}`} className="ht-card">
      <span className="ht-card-marker">{markerNumber}</span>
      <img className="ht-card-media" src={pet.thumbnail} alt={pet.name} />
      <div className="ht-card-body">
        <h3 className="ht-card-name">{pet.name}</h3>
        <p className="ht-card-meta">
          {pet.breed} · {pet.age} · {pet.gender}
        </p>
        <p className="ht-card-tagline">{pet.tagline}</p>
        <span className="ht-card-cta">Meet {pet.name}</span>
      </div>
    </Link>
  );
}

export default PetCard;
