import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo Nina shop.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { id: 'home', text: 'الرئيسية' },
    { id: 'order', text: 'الطلب الان' },
    { id: 'product', text: 'المنتج' },
    { id: 'usage', text: 'طريقة الاستخدام' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Match this with your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      window.history.pushState({}, '', `#${id}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="logo-container">
          <img src={logo} alt="NinaShop Logo" className="navbar-logo" />
          <span className="shop-name">Nina Shop</span>
        </a>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              style={{ direction: 'ltr' }}
            >
              <span className="link-text">{link.text}</span>
              <span className="link-underline"></span>
            </a>
          ))}
        </div>
        
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
