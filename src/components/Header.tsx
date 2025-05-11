
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Terminal, User, Code, FileText, FlaskConical, Menu, X } from "lucide-react";
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navItems = [
    { name: "Home", icon: <Terminal className="w-4 h-4" />, href: "#hero" },
    { name: "About", icon: <User className="w-4 h-4" />, href: "#about" },
    { name: "Projects", icon: <Code className="w-4 h-4" />, href: "#projects" },
    { name: "Resume", icon: <FileText className="w-4 h-4" />, href: "#resume" },
    { name: "Demos", icon: <FlaskConical className="w-4 h-4" />, href: "#demos" }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-ai-dark/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-purple to-ai-blue flex items-center justify-center">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">
            <span className="text-gradient">AI</span>_Portfolio
          </span>
        </a>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <button 
            className="md:hidden bg-ai-dark/60 hover:bg-ai-dark backdrop-blur-md p-2 rounded-md text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/80 hover:text-white hover:bg-ai-dark/50 transition-colors relative group overflow-hidden"
            >
              {item.icon}
              <span>{item.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ai-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          ))}
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-ai-darker/95 backdrop-blur-md z-40 transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 pt-20 pb-6">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-4 rounded-lg text-white/80 hover:text-white hover:bg-ai-dark/50 transition-colors"
              >
                <div className="p-2 rounded-md bg-ai-purple/20">
                  {item.icon}
                </div>
                <span className="text-lg">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
