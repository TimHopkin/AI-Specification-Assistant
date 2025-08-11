import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-4 animate-fade-in">
      {/* Enhanced AI avatar */}
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-glow-lg animate-glow-pulse relative">
        <Bot className="w-6 h-6 text-white animate-pulse" />
        {/* Processing indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center animate-bounce-gentle">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Enhanced typing bubble */}
      <div className="message-bubble assistant px-6 py-4 relative animate-scale-in">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/[0.01] via-secondary-500/[0.02] to-accent-500/[0.01] rounded-2xl animate-shimmer" />
        <div className="absolute top-1 left-1 w-2 h-2 bg-primary-500/20 rounded-full animate-pulse" />
        
        <div className="flex items-center space-x-3 relative z-10">
          {/* Enhanced typing dots */}
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full animate-bounce shadow-soft" style={{ animationDelay: '0ms' }} />
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full animate-bounce shadow-soft" style={{ animationDelay: '200ms' }} />
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full animate-bounce shadow-soft" style={{ animationDelay: '400ms' }} />
          </div>
          
          {/* Enhanced text with shimmer */}
          <span className="text-sm font-medium text-neutral-600 animate-pulse">
            AI is analysing...
          </span>
          
          {/* Processing animation */}
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-primary-500 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-secondary-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-1 h-1 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};