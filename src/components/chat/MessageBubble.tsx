import React from 'react';
import { User, Bot } from 'lucide-react';
import type { Message } from './ChatInterface';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start space-x-4 animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-glow-lg animate-glow-pulse relative">
          <Bot className="w-6 h-6 text-white" />
          {/* AI indicator pulse */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center animate-bounce-gentle">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      )}
      
      <div className={`max-w-3xl ${isUser ? 'order-first' : ''} group`}>
        <div
          className={`message-bubble ${isUser ? 'user' : 'assistant'} px-6 py-4 relative transition-all duration-300 group-hover:shadow-elegant-lg`}
        >
          {/* Enhanced styling for user messages */}
          {isUser && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
            </>
          )}
          
          {/* Enhanced styling for assistant messages */}
          {!isUser && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/[0.02] to-secondary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="absolute top-1 left-1 w-2 h-2 bg-primary-500/20 rounded-full animate-pulse" />
            </>
          )}
          
          <div className="whitespace-pre-wrap leading-relaxed text-base relative z-10">
            {message.content}
          </div>
        </div>
        
        <div className={`text-xs text-neutral-500 mt-2 flex items-center space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isUser ? 'bg-primary-400' : 'bg-accent-400'}`} />
          <span className="font-medium">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {!isUser && (
            <span className="text-primary-500 font-semibold text-xs">AI</span>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-elegant-lg relative">
          <User className="w-6 h-6 text-white" />
          {/* User indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};