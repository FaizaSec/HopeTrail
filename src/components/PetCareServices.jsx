import { useEffect, useState } from "react";

function PetCareServices() {
  const [services, setServices] = useState([]);
  const [area, setArea] = useState("All");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/pet-care")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch pet care services");
        }

        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const areas = ["All", ...new Set(services.map((service) => service.area))];

  const types = ["All", ...new Set(services.map((service) => service.type))];

  const filteredServices = services.filter((service) => {
    const areaMatch = area === "All" || service.area === area;
    const typeMatch = type === "All" || service.type === type;

    return areaMatch && typeMatch;
  });

  if (loading) {
    return (
      <section className="pet-care">
        <h2>Pet Care Services in Dhaka</h2>
        <p className="pet-care-loading">Loading pet care services...</p>
      </section>
    );
  }

  return (
    <section className="pet-care">
      <h2>Pet Care Services in Dhaka</h2>

      <p className="pet-care-intro">
        Find veterinary clinics, animal hospitals, grooming services, daycare
        centres, and other pet care facilities in different areas of Dhaka.
      </p>

      <div className="pet-care-filters">
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          {areas.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Areas" : item}
            </option>
          ))}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Services" : item}
            </option>
          ))}
        </select>
      </div>

      {filteredServices.length === 0 ? (
        <p className="no-services">
          No pet care services found for the selected filters.
        </p>
      ) : (
        <div className="pet-care-grid">
          {filteredServices.map((service) => (
            <div className="pet-care-card" key={service._id}>
              <h3>{service.name}</h3>

              <span className="pet-care-type">{service.type}</span>

              <p>
                <strong>Area:</strong> {service.area}
              </p>

              <p>
                <strong>Address:</strong> {service.address}
              </p>

              {service.phone && (
                <p>
                  <strong>Phone:</strong> {service.phone}
                </p>
              )}

              {service.description && (
                <p className="pet-care-description">{service.description}</p>
              )}

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  service.address,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Location
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PetCareServices;
