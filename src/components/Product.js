import React, { useState, useEffect, useRef } from 'react';
import './Product.css';
import productImage1 from '../assets/product1.jpg';
import productImage2 from '../assets/product2.jpg';
import productImage5 from '../assets/product5.jpg';

const images = [productImage1, productImage2, productImage5];

const Product = () => {
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
    <section className="product-section" id="product">
      <div className="product-container">
        <h2 className="section-title">
          <span className="title-text">معرض المنتج</span>
          <span className="title-underline"></span>
        </h2>
        <div className="product-carousel">
          <div className="carousel-container">
            <img 
              ref={imageRef}
              src={images[currentImageIndex]} 
              alt="Product showcase" 
              className={`carousel-image ${isHovered ? 'zoom-effect' : ''}`}
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            />
            <div className="carousel-navigation">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
            <div className="product-badge">جديد</div>
          </div>
          <div className="color-selector">
            <h3 className="color-selector-title">الألوان المتاحة</h3>
            <div className="carousel-caption">
              <p>تصميم أنيق وعملي لراحة قصوى</p>
            </div>
          </div>
          <div className="carousel-features">
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div className="feature-text">تصميم مريح</div>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div className="feature-text">سهولة الاستخدام</div>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div className="feature-text">جودة عالية</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
