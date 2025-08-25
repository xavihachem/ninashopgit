import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    state: '',
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (amount) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, Math.min(10, prev.quantity + amount))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus({
        success: true,
        message: 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.'
      });
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        phone: '',
        state: '',
        quantity: 1
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="order" className="order-section">
      <div className="order-container">
        <div className="order-header">
          <h3>اطلب الآن</h3>
          <p>املأ النموذج وسنتصل بك قريباً</p>
          <div className="header-decoration">
            <span className="decoration-circle"></span>
            <span className="decoration-line"></span>
            <span className="decoration-circle"></span>
          </div>
        </div>
        
        <form className="order-form" onSubmit={handleSubmit}>
          {submitStatus && (
            <div className={`form-message ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <div className="form-group floating">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label htmlFor="fullName">الاسم الكامل</label>
            <span className="form-icon">👤</span>
          </div>
          
          <div className="form-group floating">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">رقم الهاتف</label>
            <span className="form-icon">📱</span>
          </div>
          
          <div className="form-group floating">
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <label htmlFor="state">الولاية</label>
            <span className="form-icon">📍</span>
          </div>
          
          <div className="form-group floating quantity-group">
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              max="10"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
              className="quantity-input"
              required
            />
            <div className="quantity-control">
              <div className="quantity-buttons">
                <button 
                  type="button" 
                  className="quantity-btn minus" 
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >- 1</button>
                <button 
                  type="button" 
                  className="quantity-btn plus" 
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >+ 1</button>
              </div>
            </div>
            <label htmlFor="quantity">الكمية المطلوبة</label>
            <span className="form-icon">📦</span>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'جاري التحميل...' : 'تأكيد الطلب'}</span>
            <span className="btn-icon">🚀</span>
          </button>
        </form>
        
        <div className="order-footer">
          <div className="guarantee">
            <span>🚚 توصيل سريع</span>
            <span>🔒 دفع آمن</span>
            <span>📞 دعم فوري</span>
          </div>
          
          <div className="social-links">
            <h4>تابعنا على وسائل التواصل الاجتماعي</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/Ninashoop4678?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="currentColor"></path>
                </svg>
                <span>فيسبوك</span>
              </a>
              
              <a href="https://www.instagram.com/nina_shop18?igsh=MWZrbjJyNmhoeGU5ZA==" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"></path>
                </svg>
                <span>انستغرام</span>
              </a>
              
              <a href="https://www.tiktok.com/@ninashop43?_t=ZS-8z4D1gaBoWH&amp;_r=1" target="_blank" rel="noopener noreferrer" className="social-icon tiktok">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="currentColor"></path>
                </svg>
                <span>تيك توك</span>
              </a>
            </div>
          </div>
          
          <div className="footer-note">
            <p>© 2025 نينا شوب. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
