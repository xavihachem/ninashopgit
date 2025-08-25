import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OrderForm from './components/OrderForm';
import Product from './components/Product';
import UsageInstructions from './components/UsageInstructions';

function App() {
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetId = e.target.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listener to handle anchor clicks
    document.addEventListener('click', handleAnchorClick);

    // Clean up event listener
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="App" dir="ltr">
      <Navbar />
      <main>
        <section id="home" className="section">
          <Hero />
        </section>
        <OrderForm />
        <section id="product" className="section">
          <Product />
        </section>
        <section id="usage" className="section">
          <UsageInstructions />
        </section>
       
      </main>
    </div>
  );
}

export default App;
