import "./Login.css";
function Login({ onClose }) {
  return (
    <>
      <div className="login-overlay" onClick={onClose}></div>

      <div className="login-modal">
        <button className="login-close" onClick={onClose}>
          x
        </button>

        <h2>Sign In</h2>

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button className="login-submit">Sign In</button>
      </div>
    </>
  );
}

export default Login;
