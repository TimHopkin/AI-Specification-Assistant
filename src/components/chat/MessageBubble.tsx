import React from 'react';
import { User, Bot, Sparkles } from 'lucide-react';
import type { Message } from './ChatInterface';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-4 mb-6 chat-bubble-entrance ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 relative">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 relative overflow-hidden">
            <Bot className="w-5 h-5 text-white relative z-10" />
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
            {/* AI activity indicator */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-1.5 h-1.5 text-white" />
            </div>
          </div>
        </div>
      )}
      
      <div className={`max-w-2xl ${isUser ? 'order-first' : ''} group`}>
        <div className={`relative ${isUser ? 'ml-auto' : ''}`}>
          <div
            className={`
              ${isUser 
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25' 
                : 'bg-white/90 backdrop-blur-xl text-gray-800 shadow-lg shadow-gray-900/10 border border-gray-200/50'
              }
              px-5 py-4 rounded-3xl relative transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-xl message-hover-effect
              ${isUser ? 'rounded-br-lg' : 'rounded-bl-lg'}
            `}
          >
            {/* Message status indicator for user messages */}
            {isUser && (
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            )}
            
            {/* Enhanced hover effect */}
            <div className={`
              absolute inset-0 rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100
              ${isUser 
                ? 'bg-gradient-to-r from-blue-400/10 via-blue-300/20 to-blue-400/10' 
                : 'bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5'
              }
            `} />
            
            <div className="relative z-10">
              <div className={`
                whitespace-pre-wrap leading-relaxed text-[15px] font-medium
                ${isUser ? 'text-white' : 'text-gray-800'}
              `}>
                {message.content}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 mt-2 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`
            flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-sm
            ${isUser ? 'bg-blue-500/10 text-blue-600' : 'bg-gray-500/10 text-gray-600'}
          `}>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isUser ? 'bg-blue-500' : 'bg-gray-400'}`} />
            <span className="font-medium">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {!isUser && (
              <span className="text-indigo-500 font-semibold">AI</span>
            )}
          </div>
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 relative">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 relative overflow-hidden">
            <User className="w-5 h-5 text-white relative z-10" />
            {/* User activity indicator */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};