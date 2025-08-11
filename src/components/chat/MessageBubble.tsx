import React from 'react';
import { User, Bot, Sparkles } from 'lucide-react';
import type { Message } from './ChatInterface';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-4 mb-8 chat-bubble-entrance ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 relative group">
          <div className="w-11 h-11 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30 relative overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-purple-500/40">
            <Bot className="w-6 h-6 text-white relative z-10" />
            {/* Enhanced animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
            {/* Premium AI activity indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
        </div>
      )}
      
      <div className={`max-w-3xl ${isUser ? 'order-first' : ''} group`}>
        <div className={`relative ${isUser ? 'ml-auto' : ''}`}>
          <div
            className={`
              ${isUser 
                ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30' 
                : 'bg-white/95 backdrop-blur-2xl text-gray-800 shadow-xl shadow-gray-900/15 border border-white/50'
              }
              px-6 py-5 rounded-3xl relative transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl message-hover-effect
              ${isUser ? 'rounded-br-xl' : 'rounded-bl-xl'}
              ${isUser ? 'hover:shadow-blue-500/40' : 'hover:shadow-gray-900/20'}
            `}
          >
            {/* Premium message status indicator */}
            {isUser && (
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
            )}
            
            {/* Premium hover effect with layered gradients */}
            <div className={`
              absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100
              ${isUser 
                ? 'bg-gradient-to-r from-blue-400/15 via-indigo-400/25 to-blue-400/15' 
                : 'bg-gradient-to-r from-violet-500/8 via-purple-500/12 to-indigo-500/8'
              }
            `} />
            
            {/* Subtle inner glow effect */}
            <div className={`
              absolute inset-0 rounded-3xl transition-all duration-300 opacity-0 group-hover:opacity-100
              ${isUser 
                ? 'shadow-inner shadow-white/20' 
                : 'shadow-inner shadow-gray-200/30'
              }
            `} />
            
            <div className="relative z-10">
              <div className={`
                whitespace-pre-wrap leading-relaxed text-[16px] font-medium tracking-wide
                ${isUser 
                  ? 'text-white/95 font-medium' 
                  : 'text-gray-800 font-normal'
                }
              `}>
                {message.content}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center gap-3 mt-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-lg transition-all duration-300 hover:scale-105
            ${isUser 
              ? 'bg-blue-500/15 text-blue-600 hover:bg-blue-500/20 border border-blue-500/20' 
              : 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/15 border border-gray-300/20'
            }
          `}>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-lg ${isUser ? 'bg-blue-500 shadow-blue-500/50' : 'bg-gray-400 shadow-gray-400/50'}`} />
            <span className="font-semibold tracking-wide">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {!isUser && (
              <>
                <div className="w-1 h-1 rounded-full bg-indigo-400 opacity-60"></div>
                <span className="text-indigo-600 font-bold tracking-wider">AI</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 relative group">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 relative overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-emerald-500/40">
            <User className="w-6 h-6 text-white relative z-10" />
            {/* Enhanced user activity indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse shadow-lg">
              <div className="absolute inset-0.5 bg-white rounded-full"></div>
            </div>
            {/* Animated gradient overlay for user */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-full animate-shimmer" />
          </div>
        </div>
      )}
    </div>
  );
};