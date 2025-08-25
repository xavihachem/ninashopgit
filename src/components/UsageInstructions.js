import React, { useState } from 'react';
import './UsageInstructions.css';
import correctWay from '../assets/correctwayv2.png';

const UsageInstructions = () => {
  const [activeStep, setActiveStep] = useState(0);

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
  return (
    <section className="usage-instructions">
      <div className="container">
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
              <button type="button" className="nav-btn prev" onClick={prevStep}>
                السابق
              </button>
              <button type="button" className="nav-btn next" onClick={nextStep}>
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
