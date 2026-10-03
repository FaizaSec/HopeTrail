import React from "react";
import "./Hopetrail.css";

function Sidebar({
  breeds,
  areas,
  filters,
  onBreedChange,
  onAreaChange,
  onToggleValue,
  onReset,
}) {
  const ageOptions = ["Baby", "Young", "Adult", "Senior"];
  const sizeOptions = ["Small", "Medium", "Large"];
  const genderOptions = ["Male", "Female"];

  const renderCheckboxes = (type, options) => (
    <div className="ht-checkbox-row">
      {options.map((option) => (
        <label
          key={option}
          className={`ht-chip ${
            filters[type].includes(option) ? "is-active" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={filters[type].includes(option)}
            onChange={() => onToggleValue(type, option)}
          />
          {option}
        </label>
      ))}
    </div>
  );

  return (
    <aside className="ht-sidebar">
      <div className="ht-sidebar-header">
        <h2>Filter the trail</h2>

        <button type="button" className="ht-reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>

      {/* Search Area */}
      <div className="ht-filter-group">
        <label className="ht-filter-label" htmlFor="area-select">
          Area in Dhaka
        </label>

        <select
          id="area-select"
          className="ht-select"
          value={filters.area}
          onChange={(e) => onAreaChange(e.target.value)}
        >
          <option value="All">All areas</option>

          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Breed */}
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

      {/* Age */}
      <div className="ht-filter-group">
        <span className="ht-filter-label">Age</span>
        {renderCheckboxes("age", ageOptions)}
      </div>

      {/* Size */}
      <div className="ht-filter-group">
        <span className="ht-filter-label">Size</span>
        {renderCheckboxes("size", sizeOptions)}
      </div>

      {/* Gender */}
      <div className="ht-filter-group">
        <span className="ht-filter-label">Gender</span>
        {renderCheckboxes("gender", genderOptions)}
      </div>
    </aside>
  );
}

export default Sidebar;
