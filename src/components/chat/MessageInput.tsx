import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const suggestions = [
    "I want to build a web app for...",
    "I need a mobile app that helps users...", 
    "I'm thinking of creating a platform for...",
    "I want to solve the problem of...",
  ];

  return (
    <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 px-6 py-4 relative">
      {/* Modern background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Modern Quick Suggestions */}
        {message.length === 0 && (
          <div className="mb-4 animate-fade-in">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-500 animate-pulse" />
              Quick starters:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  disabled={disabled}
                  className="group text-sm text-gray-600 bg-gray-100/80 hover:bg-gray-200/80 px-3 py-1.5 rounded-full transition-all duration-200 border border-gray-200/60 hover:border-gray-300/60 backdrop-blur-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="group-hover:text-gray-800 transition-colors">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modern Message Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative group">
              <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-lg shadow-gray-900/5 transition-all duration-300 group-focus-within:shadow-xl group-focus-within:shadow-indigo-500/20 group-focus-within:border-indigo-300/50">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={disabled ? "AI is thinking..." : "Share your project idea or ask any questions..."}
                  disabled={disabled}
                  className="w-full min-h-[52px] max-h-[140px] px-5 py-4 bg-transparent resize-none focus:outline-none text-[15px] font-medium placeholder:text-gray-400 disabled:opacity-50"
                  rows={1}
                />
                
                {/* Modern focus ring effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Character count */}
                {message.length > 0 && (
                  <div className="absolute bottom-3 right-16 text-xs text-gray-400 font-medium">
                    {message.length}/1000
                  </div>
                )}
              </div>
            </div>
            
            {/* Modern send button */}
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className={`
                h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group
                ${!message.trim() || disabled 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95'
                }
              `}
            >
              <Send className={`w-5 h-5 transition-transform duration-200 ${!disabled && message.trim() ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : ''}`} />
              {!disabled && message.trim() && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              )}
            </button>
          </div>
        </form>

        {/* Modern help text */}
        <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            <span>Enter to send</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
};