import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
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
    <div className="flex-shrink-0 glass-morphism-strong border-t border-neutral-200/30 p-6 relative">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-50/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Quick Suggestions */}
        {message.length === 0 && (
          <div className="mb-6 animate-fade-in">
            <p className="text-sm font-semibold text-neutral-700 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-primary-500 animate-pulse" />
              Quick starters to get you going:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  disabled={disabled}
                  className="group text-sm text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 px-4 py-2 rounded-full transition-all duration-300 border border-primary-200/60 hover:border-primary-300/60 shadow-soft hover:shadow-elegant animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="group-hover:text-primary-800 transition-colors">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Message Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1 relative group">
            {/* Input container with enhanced styling */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={disabled ? "AI is thinking..." : "Describe your project idea, ask questions, or share your thoughts..."}
                disabled={disabled}
                className="w-full min-h-[56px] max-h-[140px] px-6 py-4 glass-morphism rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400/60 transition-all duration-300 backdrop-blur-lg shadow-elegant focus:shadow-glow text-base placeholder:text-neutral-400 disabled:opacity-50"
                rows={1}
              />
              
              {/* Enhanced focus ring effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-secondary-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Character count with better styling */}
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-neutral-500">
                    {message.length}/1000
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced send button */}
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className="h-14 px-8 shadow-elegant-xl group/send transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Send className="w-6 h-6 group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform duration-300" />
            <span className="ml-2 font-semibold">Send</span>
          </Button>
        </form>

        {/* Enhanced help text */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span>Press Enter to send</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>Shift+Enter for new line</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <span>Be as detailed as you like</span>
          </div>
        </div>
      </div>
    </div>
  );
};