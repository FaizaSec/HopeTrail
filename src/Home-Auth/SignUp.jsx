import "./SignUp.css";

function SignUp({ onClose }) {
  return (
    <>
      <div className="signup-overlay" onClick={onClose}></div>

      <div className="signup-modal">
        <button className="signup-close" onClick={onClose}>
          x
        </button>

        <h2>Create Account</h2>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <input type="password" placeholder="Confirm Password" />

        <button className="signup-submit">Create Account</button>
      </div>
    </>
  );
}

export default SignUp;
