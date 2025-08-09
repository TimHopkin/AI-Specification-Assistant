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
    <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-t border-neutral-200/60 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Quick Suggestions */}
        {message.length === 0 && (
          <div className="mb-4">
            <p className="text-sm text-neutral-600 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              Quick starters:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  disabled={disabled}
                  className="text-sm text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1 rounded-full transition-colors duration-200 border border-primary-200/60"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={disabled ? "AI is thinking..." : "Describe your project idea, ask questions, or share your thoughts..."}
              disabled={disabled}
              className="w-full min-h-[48px] max-h-[120px] px-4 py-3 bg-white/80 border border-neutral-200/60 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm shadow-elegant"
              rows={1}
            />
            
            {/* Character count */}
            <div className="absolute bottom-2 right-2 text-xs text-neutral-400">
              {message.length}/1000
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className="h-12 px-6 shadow-elegant-lg"
            size="lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>

        {/* Help text */}
        <p className="text-xs text-neutral-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line • Be as detailed or brief as you like
        </p>
      </div>
    </div>
  );
};