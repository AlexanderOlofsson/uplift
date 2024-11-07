// Footer.jsx
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h2 className="brand">Uplift</h2>
        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/help" className="footer-link">Help</a>
          <a href="/contact" className="footer-link">Contact Us</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/privacy" className="footer-link">Privacy Policy (GDPR)</a>
        </div>
        <div className="footer-info">
          <p>Contact: support@uplift.com | Phone: 031-123-456-789</p>
        </div>
        <div className="copyright">
          &copy; 2024 Uplift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
