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
            <p className="text-[15px] font-semibold text-white/90 mb-4 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400 animate-pulse shadow-lg" />
              Quick starters:
            </p>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  disabled={disabled}
                  className="group text-sm font-medium text-white/80 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-lg animate-fade-in-up hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="group-hover:text-white transition-colors tracking-wide">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modern Message Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative group">
              <div className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl shadow-black/10 transition-all duration-300 group-focus-within:shadow-2xl group-focus-within:shadow-blue-500/30 group-focus-within:border-blue-400/60 group-focus-within:bg-white/30">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={disabled ? "AI is thinking..." : "Share your project idea or ask any questions..."}
                  disabled={disabled}
                  className="w-full min-h-[56px] max-h-[160px] px-6 py-4 bg-transparent resize-none focus:outline-none text-[16px] font-medium text-white placeholder:text-white/60 disabled:opacity-50 tracking-wide leading-relaxed"
                  rows={1}
                />
                
                {/* Premium focus ring effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-all duration-500 pointer-events-none" />
                
                {/* Premium character count */}
                {message.length > 0 && (
                  <div className="absolute bottom-4 right-20 text-xs text-white/50 font-semibold bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm border border-white/20">
                    {message.length}/1000
                  </div>
                )}
              </div>
            </div>
            
            {/* Premium send button */}
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className={`
                h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group shadow-xl
                ${!message.trim() || disabled 
                  ? 'bg-white/10 text-white/30 cursor-not-allowed border border-white/20' 
                  : 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-110 active:scale-95 border border-blue-400/50'
                }
              `}
            >
              <Send className={`w-6 h-6 transition-all duration-300 ${!disabled && message.trim() ? 'group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110' : ''}`} />
              {!disabled && message.trim() && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Premium help text */}
        <div className="flex items-center justify-center gap-8 mt-4 text-xs text-white/60">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
            <span className="font-medium tracking-wide">Enter to send</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.5s' }} />
            <span className="font-medium tracking-wide">Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
};