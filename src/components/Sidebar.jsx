import React from "react";
import "./Hopetrail.css";

function Sidebar({ breeds, filters, onBreedChange, onToggleValue, onReset }) {
  const ageOptions = ["Baby", "Young", "Adult", "Senior"];
  const sizeOptions = ["Small", "Medium", "Large"];
  const genderOptions = ["Male", "Female"];

  return (
    <aside className="ht-sidebar">
      <div className="ht-sidebar-header">
        <h2>Filter the trail</h2>
        <button type="button" className="ht-reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="ht-filter-group">
        <label className="ht-filter-label" htmlFor="breed-select">
          Breed
        </label>
        <select
          id="breed-select"
          className="ht-select"
          value={filters.breed}
          onChange={(e) => onBreedChange(e.target.value)}
        >
          <option value="All">All breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className="ht-filter-group">
        <span className="ht-filter-label">Age</span>
        <div className="ht-checkbox-row">
          {ageOptions.map((age) => (
            <label
              key={age}
              className={`ht-chip ${filters.age.includes(age) ? "is-active" : ""}`}
            >
              <input
                type="checkbox"
                checked={filters.age.includes(age)}
                onChange={() => onToggleValue("age", age)}
              />
              {age}
            </label>
          ))}
        </div>
      </div>

      <div className="ht-filter-group">
        <span className="ht-filter-label">Size</span>
        <div className="ht-checkbox-row">
          {sizeOptions.map((size) => (
            <label
              key={size}
              className={`ht-chip ${filters.size.includes(size) ? "is-active" : ""}`}
            >
              <input
                type="checkbox"
                checked={filters.size.includes(size)}
                onChange={() => onToggleValue("size", size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="ht-filter-group">
        <span className="ht-filter-label">Gender</span>
        <div className="ht-checkbox-row">
          {genderOptions.map((gender) => (
            <label
              key={gender}
              className={`ht-chip ${filters.gender.includes(gender) ? "is-active" : ""}`}
            >
              <input
                type="checkbox"
                checked={filters.gender.includes(gender)}
                onChange={() => onToggleValue("gender", gender)}
              />
              {gender}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
