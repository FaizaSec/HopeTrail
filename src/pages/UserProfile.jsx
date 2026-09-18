import { useNavigate, Navigate } from "react-router";
import { useEffect, useState } from "react";

function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Profile error:", error);
      }
    };

    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  // Admin hole User Profile dekhabe na
  if (user.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return (
    <div>
      <h1>User Profile</h1>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default UserProfile;
