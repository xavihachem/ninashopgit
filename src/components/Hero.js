import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import productImage1 from '../assets/product1.jpg';
import productImage2 from '../assets/product2.jpg';
import productImage5 from '../assets/product5.jpg';
import TypingEffect from './TypingEffect';

const images = [productImage1, productImage2, productImage5];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleImageHover = () => {
    setIsHovered(true);
  };

  const handleImageLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-text-content">
          <TypingEffect 
            text="هل تعاني من صعوبة نزع حذائك؟" 
            speed={50}
            className="typing-text"
          />
          <p className="hero-description">نقدم لك أداة نزع الأحذية الخشبية، الحل الأمثل لراحتك اليومية دون الحاجة للانحناء. مصنوعة يدوياً من أجود أنواع الخشب الطبيعي.</p>
          <div className="hero-features">
            <div className="feature-item">✓ نزع سهل بدون انحناء</div>
            <div className="feature-item">✓ جودة تدوم لسنوات</div>
            <div className="feature-item">✓ تصميم أنيق وجذاب</div>
          </div>
          <div className="desktop-button">
            <button 
              className="cta-button"
              onClick={() => {
                const productSection = document.getElementById('product');
                if (productSection) {
                  productSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="button-text">تصفح المنتج</span>
            </button>
          </div>
        </div>
        <div className="hero-image-content">
          <div 
            className={`image-container ${isHovered ? 'zoomed' : ''}`}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            ref={imageRef}
          >
            <div className="image-wrapper">
              <img 
                src={images[currentImageIndex]} 
                alt="Product Shot" 
                className={`hero-image ${isHovered ? 'zoomed' : ''}`} 
              />
              <div className="image-overlay">
                <div className="image-badge">جديد</div>
              </div>
            </div>
            <div className="image-dots">
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="mobile-button">
            <button 
              className="cta-button"
              onClick={() => {
                const productSection = document.getElementById('product');
                if (productSection) {
                  productSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="button-text">تصفح المنتج</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
