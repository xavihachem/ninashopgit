import React, { useState } from 'react';
import './Hero.css';
import TypingEffect from './TypingEffect';
import whiteProduct from '../assets/product3.jpg';
import greyProduct from '../assets/product6.jpg';
import brownProduct from '../assets/product4.jpg';

const products = [
  { id: 'white', colorName: 'أبيض', image: whiteProduct },
  { id: 'grey', colorName: 'رمادي', image: greyProduct },
  { id: 'brown', colorName: 'بني', image: brownProduct },
];

const Hero = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleColorSelect = (product) => {
    if (selectedProduct.id !== product.id) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedProduct(product);
        const img = new Image();
        img.src = product.image;
        img.onload = () => {
          setIsAnimating(false);
        };
      }, 300);
    }
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
          
          <div className="color-selector">
            <h3 className="color-title">اختر اللون الذي يناسبك:</h3>
            <div className="color-options">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className={`color-option ${selectedProduct.id === product.id ? 'active' : ''}`}
                  onClick={() => handleColorSelect(product)}
                >
                  <div className="color-circle" style={{ background: product.colorName === 'أبيض' ? '#ffffff' : product.colorName === 'رمادي' ? '#808080' : '#8B4513' }}></div>
                  <span>{product.colorName}</span>
                </div>
              ))}
            </div>
          </div>

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
          <div className="hero-image">
            <div 
              className={`product-image-container ${isHovered ? 'zoomed' : ''} ${isAnimating ? 'fade-out' : 'fade-in'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img 
                src={selectedProduct.image} 
                alt={`Product in ${selectedProduct.colorName}`} 
                className="main-product-image"
              />
            </div>
            <div className="product-zoom-hint">
              مرر مؤشر الفأرة فوق الصورة للتكبير
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
