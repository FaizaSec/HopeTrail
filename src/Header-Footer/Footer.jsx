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
          <a href="#">About Us</a>
          <a href="#">Adopt a Pet</a>
          <a href="#">Pet Care</a>
          <a href="#">Contact Us</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 HopeTrail. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
