
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Mic, MicOff } from 'lucide-react';

const VoiceNavigation: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    // Check if SpeechRecognition is available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        processCommand(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        showMessage('Sorry, I didn\'t catch that. Try again?');
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  const toggleListening = () => {
    if (!recognitionRef.current) {
      showMessage('Speech recognition is not supported in this browser');
      return;
    }
    
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };
  
  const startListening = () => {
    setIsListening(true);
    recognitionRef.current.start();
    showMessage('Listening...');
  };
  
  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current.stop();
  };
  
  const processCommand = (command: string) => {
    let message = '';
    let navigated = false;
    
    // Navigation commands
    if (command.includes('home') || command.includes('top')) {
      window.location.href = '#hero';
      message = 'Navigating to home';
      navigated = true;
    } else if (command.includes('about')) {
      window.location.href = '#about';
      message = 'Navigating to about section';
      navigated = true;
    } else if (command.includes('projects')) {
      window.location.href = '#projects';
      message = 'Navigating to projects section';
      navigated = true;
    } else if (command.includes('resume')) {
      window.location.href = '#resume';
      message = 'Navigating to resume section';
      navigated = true;
    } else if (command.includes('demos')) {
      window.location.href = '#demos';
      message = 'Navigating to demos section';
      navigated = true;
    } else if (command.includes('skills')) {
      window.location.href = '#skills';
      message = 'Navigating to skills section';
      navigated = true;
    } else if (command.includes('contact')) {
      window.location.href = '#contact';
      message = 'Navigating to contact section';
      navigated = true;
    } else {
      message = `I didn't understand "${command}". Try saying "home", "about", "projects", etc.`;
    }
    
    showMessage(message);
  };
  
  const showMessage = (msg: string) => {
    setMessage(msg);
    setIsVisible(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice feedback message */}
      <div 
        className={cn(
          "fixed bottom-20 right-6 bg-ai-dark/90 backdrop-blur-md p-4 rounded-lg border border-ai-purple/30 shadow-lg text-white transition-all duration-300 max-w-xs",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {message}
      </div>
      
      {/* Voice button */}
      <button
        onClick={toggleListening}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all",
          isListening 
            ? "bg-ai-purple text-white animate-pulse" 
            : "bg-ai-dark/80 text-white/80 hover:bg-ai-dark"
        )}
        aria-label={isListening ? "Stop voice navigation" : "Start voice navigation"}
      >
        {isListening ? (
          <Mic size={20} />
        ) : (
          <MicOff size={20} />
        )}
      </button>
    </div>
  );
};

export default VoiceNavigation;
