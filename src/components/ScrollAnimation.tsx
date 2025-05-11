
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-in-right' | 'slide-in-left';
  delay?: number;
  threshold?: number;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700';
    const delayClass = delay ? `delay-[${delay}ms]` : '';
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} opacity-0 translate-y-10`;
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'scale-up':
          return `${baseClasses} opacity-0 scale-95`;
        case 'slide-in-right':
          return `${baseClasses} opacity-0 translate-x-10`;
        case 'slide-in-left':
          return `${baseClasses} opacity-0 -translate-x-10`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={cn(getAnimationClasses(), className)}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
