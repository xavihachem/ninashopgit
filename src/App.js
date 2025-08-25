import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Product from './components/Product';
import UsageInstructions from './components/UsageInstructions';

function App() {
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      // Only handle clicks on anchor elements
      if (e.target.tagName === 'A') {
        const targetId = e.target.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.getElementById(targetId.substring(1));
          if (targetElement) {
            const headerOffset = 80; // Height of your fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
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
        <section id="order" className="section">
          <div className="container">
            <h2>اطلب منتجك الآن</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              اختر اللون المفضل لديك واملأ النموذج أدناه لإكمال طلبك. سنقوم بالتواصل معك قريباً لتأكيد التفاصيل.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <button style={{
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
              }}>
                اكمل الطلب - 49.99 ريال
              </button>
            </div>
          </div>
        </section>
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
