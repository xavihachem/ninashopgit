import React, { useState, useEffect } from 'react';
import './Product.css';
import productImage1 from '../assets/product1.jpg';
import productImage2 from '../assets/product2.jpg';
import productImage5 from '../assets/product5.jpg';

const images = [productImage1, productImage2, productImage5];

const Product = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="section-title">
          <span className="title-text">اكتشف منتجاتنا</span>
          <span className="title-underline"></span>
        </h2>
        <div className="product-display">
          <div 
            className={`product-image-container ${isHovered ? 'zoomed' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src={images[currentImageIndex]} 
              alt="Shoe Remover Product" 
              className="main-product-image"
              loading="lazy"
            />
            <div className="product-badge">جديد</div>
          </div>
          <div className="color-selector">
            <h3 className="color-selector-title">الألوان المتاحة</h3>
            <div className="image-navigation">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            <div className="color-options-grid">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`color-option ${selectedProduct.id === product.id ? 'active' : ''}`}
                  onClick={() => handleColorSelect(product)}
                  onMouseEnter={() => setIsHovered(false)}
                >
                  <div className="color-thumbnail-container">
                    <img 
                      src={product.image} 
                      alt={product.colorName} 
                      className="color-thumbnail" 
                      loading="lazy"
                    />
                    <div className="color-selection-indicator">
                      <div className="checkmark">✓</div>
                    </div>
                  </div>
                  <span className="color-name">{product.colorName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
