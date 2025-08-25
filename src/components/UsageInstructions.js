import React, { useState } from 'react';
import './UsageInstructions.css';
import correctWay from '../assets/correctwayv2.png';

const UsageInstructions = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    state: '',
    quantity: 1,
    deliveryMethod: 'office' // Default to 'office' (توصيل الى المكتب)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const steps = [
    {
      title: 'الخطوة الأولى',
      description: 'ضع الأداة على سطح مستوٍ ومستقر',
      emoji: '📏',
      image: correctWay
    },
    {
      title: 'الخطوة الثانية',
      description: 'أدخل كعب الحذاء في الفتحة المخصصة',
      emoji: '👞',
      image: correctWay
    },
    {
      title: 'الخطوة الثالثة',
      description: 'اضغط برفق للأسفل بقدمك الأخرى',
      emoji: '🦶',
      image: correctWay
    },
    {
      title: 'الخطوة الرابعة',
      description: 'اسحب قدمك للخارج بسهولة',
      emoji: '👟',
      image: correctWay
    }
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'quantity' ? parseInt(value, 10) || 1 : value
    }));
  };

  // Use relative URL in production, absolute in development
  const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.state) {
      setSubmitStatus({ success: false, message: 'الرجاء ملء جميع الحقول المطلوبة' });
      return;
    }

    // Phone number validation (basic check for numbers only)
    const phoneRegex = /^[0-9+\s-]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setSubmitStatus({ success: false, message: 'الرجاء إدخال رقم هاتف صحيح' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('[Order] Submitting payload', formData);
      const response = await fetch(`${API_BASE}/api/send-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('[Order] Response status:', response.status);
      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        const txt = await response.text();
        console.warn('[Order] Non-JSON response:', txt);
      }

      if (!response.ok) {
        console.error('[Order] Server returned error', { status: response.status, data });
        throw new Error('Failed to submit order. Please try again.');
      }

      if (data.success) {
        setSubmitStatus({
          success: true,
          message: 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.'
        });

        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          state: '',
          quantity: 1
        });
      } else {
        throw new Error(data.message || 'فشل إرسال الطلب');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitStatus({
        success: false,
        message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="usage-instructions">
      <div className="container">
        <div className="order-section">
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
                  type="text" 
                  id="fullName" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
                <label htmlFor="fullName">الاسم الكامل</label>
                <span className="form-icon">👤</span>
              </div>
              
              <div className="form-group floating">
                <input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                  placeholder=" "
                />
                <label htmlFor="phone">رقم الهاتف</label>
                <span className="form-icon">📱</span>
              </div>
              
              <div className="form-group floating">
                <input 
                  type="text" 
                  id="state" 
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                />
                <label htmlFor="state">الولاية</label>
                <span className="form-icon">📍</span>
              </div>
              
              <div className="form-group floating quantity-group">
                <input 
                  type="number" 
                  id="quantity" 
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={(e) => {
                    const value = Math.min(10, Math.max(1, parseInt(e.target.value) || 1));
                    handleInputChange({ target: { id: 'quantity', value: value.toString() } });
                  }}
                  required 
                  className="quantity-input"
                />
                <div className="quantity-control">
                  <div className="quantity-buttons">
                    <button 
                      type="button" 
                      className="quantity-btn minus"
                      onClick={() => {
                        const newValue = Math.max(1, (parseInt(formData.quantity) || 1) - 1);
                        handleInputChange({ target: { id: 'quantity', value: newValue.toString() } });
                      }}
                      aria-label="Decrease quantity"
                    >
                      - 1
                    </button>
                    <button 
                      type="button" 
                      className="quantity-btn plus"
                      onClick={() => {
                        const newValue = Math.min(10, (parseInt(formData.quantity) || 0) + 1);
                        handleInputChange({ target: { id: 'quantity', value: newValue.toString() } });
                      }}
                      aria-label="Increase quantity"
                    >
                      + 1
                    </button>
                  </div>
                </div>
                <label htmlFor="quantity">الكمية المطلوبة</label>
                <span className="form-icon">📦</span>
              </div>

              <div className="form-group">
                <label className="delivery-method-label">طريقة التوصيل</label>
                <div className="delivery-options">
                  <label className={`delivery-option ${formData.deliveryMethod === 'office' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="office"
                      checked={formData.deliveryMethod === 'office'}
                      onChange={handleInputChange}
                      className="delivery-radio"
                    />
                    <span className="delivery-option-content">
                      <span className="delivery-icon">🏢</span>
                      <span className="delivery-text">توصيل الى المكتب</span>
                    </span>
                  </label>
                  
                  <label className={`delivery-option ${formData.deliveryMethod === 'post' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="post"
                      checked={formData.deliveryMethod === 'post'}
                      onChange={handleInputChange}
                      className="delivery-radio"
                    />
                    <span className="delivery-option-content">
                      <span className="delivery-icon">📮</span>
                      <span className="delivery-text">توصيل الى مكتب البريد</span>
                    </span>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>جاري الإرسال...</span>
                ) : (
                  <>
                    <span>تأكيد الطلب</span>
                    <span className="btn-icon">🚀</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="order-footer">
              <div className="guarantee">
                <span>🚚 توصيل سريع</span>
                <span>🔒 دفع آمن</span>
                <span>📞 دعم فوري</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">
            <span className="title-text">كيفية الاستخدام</span>
          </h2>
          <p className="section-subtitle">دليل بسيط لاستخدام المنتج</p>
        </div>

        <div className="step-container">
          <div className="step-image">
            <img src={steps[activeStep].image} alt={steps[activeStep].title} />
          </div>
          <div className="step-content">
            <div className="step-indicator">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`step-dot ${index === activeStep ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>
            <div className="step-details">
              <span className="step-emoji">{steps[activeStep].emoji}</span>
              <h3 className="step-title">{steps[activeStep].title}</h3>
              <p className="step-description">{steps[activeStep].description}</p>
            </div>
            <div className="step-navigation">
              <button className="nav-btn prev" onClick={prevStep}>
                السابق
              </button>
              <button className="nav-btn next" onClick={nextStep}>
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsageInstructions;
