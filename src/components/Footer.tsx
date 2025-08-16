
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ai-dark py-12 border-t border-ai-purple/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-purple to-ai-blue flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Looking forward to connecting</h3>
            </div>
            <p className="text-white/60 mb-6">
              Creating intelligent systems that understand, learn, and evolve.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Aniketsy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/aniket-singh-yadav-970b3b296/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:singhyadavaniket43@gmail.com" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="https://codeforces.com/profile/hiibuddy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors" aria-label="Codeforces">
                <span className="font-bold text-xs">CF</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-ai-purple/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Looking forward to connecting. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
