import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <h3>تواصل معنا</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/Ninashoop4678?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/nina_shop18?igsh=MWZrbjJyNmhoeGU5ZA==" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@ninashop43?_t=ZS-8z4D1gaBoWH&_r=1" target="_blank" rel="noopener noreferrer" className="social-icon">
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
