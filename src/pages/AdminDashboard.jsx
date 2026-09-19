import { useNavigate, Navigate } from "react-router";
import { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // Adoption applications rakhar jonno
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Login kora user er information
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Backend theke sob adoption application ana
  useEffect(() => {
    const getApplications = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:4000/api/adoptions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message);
          setLoading(false);
          return;
        }

        setApplications(data.applications);
        setLoading(false);
      } catch (error) {
        console.error("Application fetch error:", error);
        setLoading(false);
      }
    };

    if (user && user.role === "admin") {
      getApplications();
    }
  }, []);

  // Login kora na thakle Home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Login kora ace kintu Admin na
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Application status Approved / Rejected kora
  const handleStatusChange = async (applicationId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:4000/api/adoptions/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Status update failed");
        return;
      }

      // Status update howar por dashboard eo sathe sathe update
      setApplications((previousApplications) =>
        previousApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status: newStatus }
            : application,
        ),
      );
    } catch (error) {
      console.error("Status update error:", error);
      alert("Something went wrong");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div>
          <p className="admin-label">HopeTrail Administration</p>

          <h1>Adoption Applications</h1>

          <p className="admin-subtitle">
            Review and manage submitted pet adoption applications.
          </p>
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Summary */}
      <div className="application-summary">
        <div>
          <span>Total Applications</span>
          <strong>{applications.length}</strong>
        </div>

        <div>
          <span>Pending</span>

          <strong>
            {
              applications.filter(
                (application) => application.status === "Pending",
              ).length
            }
          </strong>
        </div>
      </div>

      {/* Applications */}
      {loading ? (
        <p className="application-message">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="application-message">No adoption applications found.</p>
      ) : (
        <div className="applications-container">
          {applications.map((application) => (
            <div className="application-card" key={application._id}>
              {/* Card Header */}
              <div className="application-card-header">
                <div>
                  <p className="application-id">
                    Application #{application._id.slice(-6)}
                  </p>

                  <h2>{application.fullName}</h2>
                </div>

                {/* Pending hole dropdown dekhabe */}
                {application.status === "Pending" ? (
                  <select
                    className="status-select pending"
                    value="Pending"
                    onChange={(e) => {
                      const newStatus = e.target.value;

                      if (newStatus !== "Pending") {
                        handleStatusChange(application._id, newStatus);
                      }
                    }}
                  >
                    <option value="Pending">Pending</option>

                    <option value="Approved">Approve</option>

                    <option value="Rejected">Reject</option>
                  </select>
                ) : (
                  // Approved / Rejected hole sudhu status dekhabe
                  <span
                    className={`status-badge ${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </span>
                )}
              </div>

              {/* Pet */}
              <div className="pet-section">
                <span>Applying for</span>
                <h3>{application.petName}</h3>
              </div>

              {/* Application Details */}
              <div className="application-details">
                <div className="detail-item">
                  <span>Email</span>
                  <p>{application.email}</p>
                </div>

                <div className="detail-item">
                  <span>Phone</span>
                  <p>{application.phone}</p>
                </div>

                <div className="detail-item">
                  <span>Address</span>
                  <p>{application.address}</p>
                </div>

                <div className="detail-item">
                  <span>Housing Type</span>
                  <p>{application.housingType}</p>
                </div>

                <div className="detail-item">
                  <span>Other Pets</span>
                  <p>{application.hasOtherPets}</p>
                </div>

                <div className="detail-item">
                  <span>Submitted</span>
                  <p>{new Date(application.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Reason */}
              <div className="application-reason">
                <span>Reason for Adoption</span>
                <p>{application.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
