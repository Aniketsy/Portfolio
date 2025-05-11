
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead Data Scientist",
    company: "TechVision AI",
    text: "Working with this AI engineer was a game-changer for our computer vision project. Their deep understanding of neural networks and ability to optimize models for production was impressive. The solution they built exceeded our performance targets by 24%.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "DataFlow Systems",
    text: "I've collaborated with many ML engineers, but few have the combination of theoretical knowledge and practical implementation skills. Their work on our NLP pipeline transformed how we process customer feedback, resulting in much more accurate sentiment analysis.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Research Director",
    company: "AI Research Institute",
    text: "Their contribution to our research team was invaluable. They quickly grasped complex concepts in reinforcement learning and implemented experiments that helped us publish two significant papers. A truly talented AI researcher with excellent communication skills.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop"
  }
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [isAnimating]);
  
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute top-10 left-0 text-5xl text-ai-purple/30 z-0">
        <Quote size={80} />
      </div>
      
      <div className="relative z-10 py-6 px-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={cn(
              "absolute inset-0 flex flex-col md:flex-row items-center transition-all duration-500",
              index === activeIndex 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 pointer-events-none",
              isAnimating 
                ? direction === 'right' 
                  ? "translate-x-full" 
                  : "-translate-x-full"
                : "",
              index !== activeIndex && !isAnimating ? "hidden" : ""
            )}
          >
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden border-2 border-ai-purple/50 p-1">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ai-purple/20 to-ai-blue/20 pointer-events-none" />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 glass-card p-6 rounded-lg">
              <p className="text-white/90 text-lg italic mb-6">"{testimonial.text}"</p>
              
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-ai-purple">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 'right' : 'left');
              setActiveIndex(index);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === activeIndex
                ? "bg-ai-purple w-6"
                : "bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none px-4">
        <button
          onClick={prevTestimonial}
          className="w-10 h-10 rounded-full bg-ai-dark/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 pointer-events-auto hover:bg-ai-purple/50 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextTestimonial}
          className="w-10 h-10 rounded-full bg-ai-dark/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 pointer-events-auto hover:bg-ai-purple/50 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSection;
