import React, { useState } from 'react';
import './Product.css';
import whiteProduct from '../assets/product3.jpg';
import greyProduct from '../assets/product6.jpg';
import brownProduct from '../assets/product4.jpg';

const products = [
  { id: 'white', colorName: 'أبيض', image: whiteProduct },
  { id: 'grey', colorName: 'رمادي', image: greyProduct },
  { id: 'brown', colorName: 'بني', image: brownProduct },
];

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleColorSelect = (product) => {
    if (selectedProduct.id !== product.id) {
      setIsAnimating(true);
      // Wait for fade out animation to complete before changing the image
      setTimeout(() => {
        setSelectedProduct(product);
        // Wait for image to load before fading in
        const img = new Image();
        img.src = product.image;
        img.onload = () => {
          setIsAnimating(false);
        };
      }, 300);
    }
  };

  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="section-title">
          <span className="title-text">اختر اللون الذي يناسبك</span>
          <span className="title-underline"></span>
        </h2>
        <div className="product-display">
          <div 
            className={`product-image-container ${isHovered ? 'zoomed' : ''} ${isAnimating ? 'fade-out' : 'fade-in'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src={selectedProduct.image} 
              alt={`Product in ${selectedProduct.id}`} 
              className="main-product-image"
              loading="lazy"
            />
            <div className="product-badge">جديد</div>
          </div>
          <div className="color-selector">
            <h3 className="color-selector-title">الألوان المتاحة</h3>
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
