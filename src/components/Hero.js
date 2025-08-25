import React, { useState } from 'react';
import './Hero.css';
import TypingEffect from './TypingEffect';
import whiteProduct from '../assets/product3.jpg';
import greyProduct from '../assets/product6.jpg';
import brownProduct from '../assets/product4.jpg';

const products = [
  { id: 'white', colorName: 'أبيض', image: whiteProduct, color: '#ffffff' },
  { id: 'grey', colorName: 'رمادي', image: greyProduct, color: '#808080' },
  { id: 'brown', colorName: 'بني', image: brownProduct, color: '#8B4513' },
];

const Hero = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleColorSelect = (product) => {
    if (selectedProduct.id !== product.id) {
      setIsAnimating(true);
      setSelectedProduct(product);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const scrollToProduct = () => {
    const usageSection = document.getElementById('usage');
    if (usageSection) {
      // First scroll to the usage section
      usageSection.scrollIntoView({ behavior: 'smooth' });
      
      // Then scroll to the order form within the usage section
      setTimeout(() => {
        const orderSection = document.querySelector('.order-section');
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <TypingEffect 
              text="هل تعاني من صعوبة نزع حذائك؟" 
              speed={50}
              className="typing-text"
            />
            <p className="hero-description">
              نقدم لك أداة نزع الأحذية الخشبية، الحل الأمثل لراحتك اليومية 
              دون الحاجة للانحناء. مصنوعة يدوياً من أجود أنواع الخشب الطبيعي.
            </p>
          </div>

          <div className="mobile-content-below-image">
            <div 
              className="product-image-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img 
                src={selectedProduct.image} 
                alt={`أداة نزع أحذية خشبية باللون ${selectedProduct.colorName}`}
                className={`product-image ${isAnimating ? 'fade-out' : 'fade-in'} ${isHovered ? 'zoomed' : ''}`}
              />
              <div className="product-zoom-hint">
                مرر مؤشر الفأرة فوق الصورة للتكبير
              </div>
            </div>
            
            <div className="color-selector">
              <h3 className="color-title">اختر اللون:</h3>
              <div className="color-options">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    className={`color-option ${selectedProduct.id === product.id ? 'active' : ''}`}
                    onClick={() => handleColorSelect(product)}
                  >
                    <div 
                      className="color-circle" 
                      style={{ backgroundColor: product.color }}
                    ></div>
                    <span className="color-name">{product.colorName}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="cta-button"
              onClick={scrollToProduct}
            >
              اطلب الآن - 49.99 ريال
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
