import React from 'react';
import { Bot, Brain, Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 mb-6 animate-fade-in-up">
      {/* Modern AI avatar matching the new message bubble style */}
      <div className="flex-shrink-0 relative">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 relative overflow-hidden">
          <Bot className="w-5 h-5 text-white relative z-10 animate-pulse" />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
          {/* Processing indicator */}
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
            <Brain className="w-1.5 h-1.5 text-white" />
          </div>
        </div>
      </div>
      
      {/* Modern typing bubble */}
      <div className="max-w-2xl group">
        <div className="relative">
          <div className="bg-white/90 backdrop-blur-xl text-gray-800 shadow-lg shadow-gray-900/10 border border-gray-200/50 px-5 py-4 rounded-3xl rounded-bl-lg relative transition-all duration-300 animate-scale-in">
            {/* Subtle animated background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/5 via-purple-500/10 to-pink-500/5 animate-pulse" />
            
            <div className="flex items-center gap-4 relative z-10">
              {/* Modern typing dots */}
              <div className="flex items-center gap-1">
                <div 
                  className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce shadow-sm" 
                  style={{ animationDelay: '0ms', animationDuration: '1.2s' }} 
                />
                <div 
                  className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce shadow-sm" 
                  style={{ animationDelay: '200ms', animationDuration: '1.2s' }} 
                />
                <div 
                  className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce shadow-sm" 
                  style={{ animationDelay: '400ms', animationDuration: '1.2s' }} 
                />
              </div>
              
              {/* Typing text with modern styling */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 animate-pulse">
                  AI is thinking
                </span>
                <div className="flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 text-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/20 to-pink-500/10 opacity-0 animate-pulse" style={{ animationDuration: '2s' }} />
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2 mt-2 justify-start">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-sm bg-indigo-500/10 text-indigo-600">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-medium text-xs">Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};