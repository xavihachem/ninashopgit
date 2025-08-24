import React, { useState, useEffect, useRef } from 'react';

const TypingEffect = ({ text, speed = 100, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);

  // Typing effect
  useEffect(() => {
    if (isTyping) {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Start the delay before resetting (30 seconds total cycle)
        const displayDuration = 30000 - (text.length * speed); // Calculate remaining time to make total 30s
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, Math.max(2000, displayDuration)); // Show complete text for the remaining time
        return () => clearTimeout(timeout);
      }
    } else {
      // Start deleting text
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, speed / 2); // Faster deletion
        return () => clearTimeout(timeout);
      } else {
        // Reset for next typing cycle
        const timeout = setTimeout(() => {
          setCurrentIndex(0);
          setIsTyping(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, text, speed, isTyping, displayedText]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <h1 className={className} style={{ minHeight: '1.5em' }}>
      {displayedText}
      <span className="cursor" style={{ opacity: isTyping ? 1 : 0 }}>|</span>
    </h1>
  );
};

export default TypingEffect;
