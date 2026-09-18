import { useNavigate, Navigate } from "react-router";

function AdminDashboard() {
  const navigate = useNavigate();

  // Login kora user er information
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Login kora na thakle Home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Login kora ace kintu Admin na
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin</p>

      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default AdminDashboard;
