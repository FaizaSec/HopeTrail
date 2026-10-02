import { useNavigate, Navigate } from "react-router";
import { useEffect, useState } from "react";
import "./UserProfile.css";

function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // NEW: User er adoption applications rakhar jonno
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  // -----------------------------------------
  // HANDLE BROWSER BACK CACHE
  // -----------------------------------------
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  // -----------------------------------------
  // EXISTING LOGIC - User profile ana
  // -----------------------------------------
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile",
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          await fetch("http://localhost:4000/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });

          //localStorage.removeItem("user"); //eta delete korte hobe
          //window.location.href = "/";
          window.location.replace("/");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Profile error:", error);
      }
    };

    getProfile();
  }, []); //ekhane change korsi

  // -----------------------------------------
  // NEW LOGIC - User er nijer applications ana
  // -----------------------------------------
  useEffect(() => {
    const getMyApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/adoptions/my-applications",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message);
          setApplicationsLoading(false);
          return;
        }

        setApplications(data.applications);
        setApplicationsLoading(false);
      } catch (error) {
        console.error("Application fetch error:", error);
        setApplicationsLoading(false);
      }
    };

    getMyApplications();
  }, []);

  // -----------------------------------------
  // EXISTING LOGIC - Logout
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

    //localStorage.removeItem("user"); //etao delete korte hobe

    //navigate("/");
    //window.location.reload();
    window.location.replace("/");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  // EXISTING LOGIC
  // Admin hole User Profile dekhabe na
  if (user.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return (
    <div className="user-profile-page">
      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div>
          <p className="profile-label">HopeTrail Account</p>
          <h1>User Profile</h1>
          <p className="profile-subtitle">
            View your profile and adoption application status.
          </p>
        </div>

        <button className="profile-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* USER INFORMATION */}
      <div className="profile-info-card">
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      {/* MY APPLICATIONS */}
      <div className="my-applications-section">
        <div className="applications-heading">
          <div>
            <p className="profile-label">Adoption</p>
            <h2>My Adoption Applications</h2>
          </div>

          <div className="application-count">
            {applications.length} Application
            {applications.length !== 1 ? "s" : ""}
          </div>
        </div>

        {applicationsLoading ? (
          <p className="profile-message">Loading applications...</p>
        ) : applications.length === 0 ? (
          <div className="no-applications">
            <h3>No applications yet</h3>
            <p>You have not submitted any adoption applications yet.</p>
          </div>
        ) : (
          <div className="user-applications-grid">
            {applications.map((application) => (
              <div className="user-application-card" key={application._id}>
                <div className="user-application-header">
                  <div>
                    <p className="application-number">
                      Application #{application._id.slice(-6)}
                    </p>

                    <h3>{application.petName}</h3>
                  </div>

                  <span
                    className={`user-status ${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="user-application-details">
                  <div>
                    <span>Applicant</span>
                    <p>{application.fullName}</p>
                  </div>

                  <div>
                    <span>Submitted</span>
                    <p>
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="status-information">
                  {application.status === "Pending" && (
                    <p>Your application is currently under review.</p>
                  )}

                  {application.status === "Approved" && (
                    <p>Your adoption application has been approved.</p>
                  )}

                  {application.status === "Rejected" && (
                    <p>Your adoption application was not approved.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
