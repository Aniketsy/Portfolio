
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-colors duration-300",
        theme === 'dark' ? 'bg-ai-dark hover:bg-ai-dark/80' : 'bg-white/90 hover:bg-white'
      )}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun 
          className={cn(
            "absolute transition-all duration-300 text-yellow-400",
            theme === 'dark' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          )}
          size={18}
        />
        <Moon 
          className={cn(
            "absolute transition-all duration-300 text-ai-purple",
            theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          )}
          size={18}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
