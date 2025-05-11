
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  delayAfterText?: number;
  className?: string;
  loop?: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  typingSpeed = 80,
  backspaceSpeed = 30,
  delayAfterText = 1500,
  className = '',
  loop = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;
    
    const currentText = texts[currentIndex];
    let timeout: NodeJS.Timeout;

    // Handle waiting after complete text is displayed
    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayAfterText);
      return () => clearTimeout(timeout);
    }

    // Handle typing and deleting logic
    if (!isDeleting && displayText === currentText) {
      setIsWaiting(true);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => 
        loop ? (prevIndex + 1) % texts.length : Math.min(prevIndex + 1, texts.length - 1)
      );
      return;
    }

    const speed = isDeleting ? backspaceSpeed : typingSpeed;
    timeout = setTimeout(() => {
      setDisplayText(prev => {
        if (isDeleting) {
          return prev.slice(0, -1);
        } else {
          return currentText.slice(0, prev.length + 1);
        }
      });
    }, speed);

    return () => clearTimeout(timeout);
  }, [
    texts, 
    displayText, 
    isDeleting, 
    currentIndex, 
    isWaiting,
    typingSpeed,
    backspaceSpeed,
    delayAfterText,
    loop
  ]);

  return (
    <span className={`${className} cursor`}>
      {displayText}
    </span>
  );
};

export default TypingEffect;
