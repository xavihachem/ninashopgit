import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <h3>تواصل معنا</h3>
          <div className="social-icons">
            <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@your-tiktok" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
        <div className="footer-info">
          <p>© {new Date().getFullYear()} نينا شوب. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
