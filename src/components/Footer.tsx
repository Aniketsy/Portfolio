
import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ai-dark py-12 border-t border-ai-purple/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-purple to-ai-blue flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <h3 className="text-lg font-semibold text-white">AI Portfolio</h3>
            </div>
            <p className="text-white/60 mb-6">
              Creating intelligent systems that understand, learn, and evolve.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-ai-dark/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-ai-purple/20 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-white/70 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-white/70 hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="text-white/70 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#resume" className="text-white/70 hover:text-white transition-colors">Resume</a></li>
              <li><a href="#demos" className="text-white/70 hover:text-white transition-colors">Demos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-white/70 mb-2">Get in touch for collaborations, projects, or just to chat about AI!</p>
          </div>
        </div>
        
        <div className="border-t border-ai-purple/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AI Portfolio. All rights reserved.
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
