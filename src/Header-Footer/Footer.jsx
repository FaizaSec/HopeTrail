import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>HopeTrail</h2>
          <p>Helping pets find loving homes.</p>
        </div>

        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/adopt">Adopt a Pet</Link>
          <Link to="/pet-care">Pet Care</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 HopeTrail. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
