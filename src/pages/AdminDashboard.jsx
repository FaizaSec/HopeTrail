import { useNavigate, Navigate } from "react-router";
import { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // Adoption applications
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logged in admin user
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // -----------------------------------------
  // VERIFY USER FROM BACKEND
  // -----------------------------------------
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile",
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        // Token invalid / expired / no login
        if (!response.ok) {
          await fetch("http://localhost:4000/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });

          localStorage.removeItem("user");

          window.location.href = "/";
          return;
        }

        // Backend theke actual user
        setUser(data.user);
        setAuthLoading(false);
      } catch (error) {
        console.error("Authentication error:", error);

        localStorage.removeItem("user");

        window.location.href = "/";
      }
    };

    verifyUser();
  }, []);

  // -----------------------------------------
  // GET ALL ADOPTION APPLICATIONS
  // -----------------------------------------
  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/adoptions", {
          method: "GET",
          credentials: "include",
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

    // Only admin can get applications
    if (user && user.role === "admin") {
      getApplications();
    }
  }, [user]);

  // -----------------------------------------
  // AUTH LOADING
  // -----------------------------------------
  if (authLoading) {
    return <p>Loading...</p>;
  }

  // -----------------------------------------
  // NOT LOGGED IN
  // -----------------------------------------
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // -----------------------------------------
  // LOGGED IN BUT NOT ADMIN
  // -----------------------------------------
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // -----------------------------------------
  // APPLICATION STATUS CHANGE
  // -----------------------------------------
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/adoptions/${applicationId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
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

  // -----------------------------------------
  // LOGOUT
  // -----------------------------------------
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("user");

    window.location.href = "/";
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
