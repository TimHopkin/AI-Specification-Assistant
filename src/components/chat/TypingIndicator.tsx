import React from 'react';
import { Bot, Brain, Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 mb-8 animate-fade-in-up">
      {/* Premium AI avatar matching the new message bubble style */}
      <div className="flex-shrink-0 relative group">
        <div className="w-11 h-11 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30 relative overflow-hidden transition-all duration-300">
          <Bot className="w-6 h-6 text-white relative z-10 animate-pulse" />
          {/* Enhanced animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
          {/* Premium processing indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
            <Brain className="w-2 h-2 text-white" />
          </div>
        </div>
      </div>
      
      {/* Premium typing bubble */}
      <div className="max-w-3xl group">
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-2xl text-gray-800 shadow-xl shadow-gray-900/15 border border-white/50 px-6 py-5 rounded-3xl rounded-bl-xl relative transition-all duration-300 animate-scale-in group-hover:scale-[1.02] group-hover:shadow-2xl hover:shadow-gray-900/20">
            {/* Premium animated background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/8 via-purple-500/12 to-indigo-500/8 animate-pulse" />
            
            <div className="flex items-center gap-5 relative z-10">
              {/* Premium typing dots */}
              <div className="flex items-center gap-1.5">
                <div 
                  className="w-3 h-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full animate-bounce shadow-lg shadow-violet-500/50" 
                  style={{ animationDelay: '0ms', animationDuration: '1.4s' }} 
                />
                <div 
                  className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50" 
                  style={{ animationDelay: '200ms', animationDuration: '1.4s' }} 
                />
                <div 
                  className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-bounce shadow-lg shadow-indigo-500/50" 
                  style={{ animationDelay: '400ms', animationDuration: '1.4s' }} 
                />
              </div>
              
              {/* Premium typing text */}
              <div className="flex items-center gap-3">
                <span className="text-[16px] font-medium text-gray-700 animate-pulse tracking-wide">
                  AI is thinking
                </span>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-violet-500 animate-spin shadow-lg" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/20 to-pink-500/10 opacity-0 animate-pulse" style={{ animationDuration: '2s' }} />
          </div>
        </div>
        
        {/* Premium status indicator */}
        <div className="flex items-center gap-3 mt-3 justify-start">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-lg transition-all duration-300 hover:scale-105 bg-violet-500/15 text-violet-600 hover:bg-violet-500/20 border border-violet-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shadow-lg shadow-violet-500/50" />
            <span className="font-semibold text-xs tracking-wide">Processing</span>
            <div className="w-1 h-1 rounded-full bg-violet-400 opacity-60"></div>
            <span className="text-violet-600 font-bold text-xs tracking-wider">AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};