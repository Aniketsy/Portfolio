
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Send, Loader2 } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  sentAt: Date;
};

// ...existing code...

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 0, 
      text: "Hi there! I'm an AI assistant that can tell you about the portfolio owner. What would you like to know?", 
      isUser: false, 
      sentAt: new Date() 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length,
      text: input,
      isUser: true,
      sentAt: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('/api/chat', { message: input });
      const aiMessage: Message = {
        id: messages.length + 1,
        text: res.data.response || 'No response',
        isUser: false,
        sentAt: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: messages.length + 1,
        text: 'Error: Could not get response from server.',
        isUser: false,
        sentAt: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <div className="glass-card rounded-lg flex flex-col w-full h-[400px] overflow-hidden neo-border">
      <div className="p-4 border-b border-ai-purple/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-purple to-ai-blue flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-white">AI Assistant</h3>
          <p className="text-xs text-white/60">Ask me anything about the portfolio owner</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                message.isUser 
                  ? 'bg-ai-purple/30 text-white' 
                  : 'bg-ai-dark text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-[10px] text-white/50 mt-1">
                {message.sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="bg-ai-dark rounded-lg px-4 py-2.5">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-ai-blue/60 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-ai-blue/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-ai-blue/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-ai-purple/20 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-ai-dark/50 text-white placeholder:text-white/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ai-purple/30"
        />
        <button 
          type="submit"
          disabled={isTyping || input.trim() === ''}
          className={`px-3 py-2 rounded-md transition-colors ${
            isTyping || input.trim() === '' 
              ? 'bg-ai-dark/50 text-white/50' 
              : 'bg-ai-purple text-white'
          }`}
        >
          {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
