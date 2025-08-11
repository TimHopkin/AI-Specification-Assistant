import React, { useState, useRef, useEffect } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ConfidencePanel } from './ConfidencePanel';
import { useClaudeApi, type SpecificationContext, type ConfidenceMetrics } from '../../services/claudeApi';
import { ArrowLeft, Download, Sparkles, AlertCircle } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const [showMobileProgress, setShowMobileProgress] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI specification mentor. I'm here to help you create a comprehensive software specification through guided conversation.

Let's start with the basics: **What type of software would you like to build?** 

For example:
• A web application for managing tasks
• A mobile app for fitness tracking  
• An e-commerce platform
• A data dashboard for analytics
• Something completely different

Don't worry if you're not sure about the technical details yet - that's exactly what I'm here to help you figure out! 🚀`,
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [specificationContext, setSpecificationContext] = useState<SpecificationContext>({});
  const [confidence, setConfidence] = useState<ConfidenceMetrics>({
    technicalArchitecture: 0,
    userExperience: 0,
    businessLogic: 0,
    developmentEnvironment: 100, // Already completed in setup
    securityCompliance: 0,
    performanceScaling: 0,
  });

  // Initialize Claude API service (with error handling)
  const claudeApi = useClaudeApi();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Clear any previous API errors
    setApiError(null);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Check if Claude API is available
    if (!claudeApi) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I don't have access to my AI service right now. This usually means:

• **API Key Missing**: Your Claude API key might not be configured properly
• **Setup Incomplete**: You may need to complete the API configuration step

**To fix this:**
1. Go back to the dashboard
2. Check your API configuration in settings
3. Make sure you've entered a valid Anthropic API key

Once that's set up, I'll be able to provide intelligent responses and help you build a comprehensive specification! 🔧`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setApiError('API not configured. Please check your settings.');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare conversation history for Claude API
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call real Claude API
      const apiResponse = await claudeApi.sendMessage(conversationHistory, specificationContext);
      
      // Create AI response message
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: apiResponse.response,
        timestamp: new Date(),
      };
      
      // Update state with AI response and new context
      setMessages(prev => [...prev, aiResponse]);
      setSpecificationContext(apiResponse.updatedContext);
      setConfidence(apiResponse.confidence);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an issue connecting to my AI service. This could be due to:

• **Network connectivity issues**
• **API rate limiting** (too many requests)
• **Invalid API key** or configuration problems

**Error details:** ${error instanceof Error ? error.message : 'Unknown error'}

Please wait a moment and try again. If the problem persists, check your API key configuration in settings.`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setApiError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  const overallConfidence = Math.round(
    Object.values(confidence).reduce((sum, value) => sum + value, 0) / Object.keys(confidence).length
  );

  const canGenerateSpec = overallConfidence >= 80;

  const handleGenerateSpec = () => {
    console.log('Generating specification...');
    // Phase 4 will implement specification generation
  };

  return (
    <div className="h-screen flex flex-col bg-transparent font-sans">
      {/* Modern Header */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3 sm:px-6 sm:py-4">
        {/* Modern API Error Banner */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-50/80 border border-red-200/50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-700">API Connection Issue</p>
                <p className="text-xs text-red-600/80 mt-1">
                  Having trouble connecting to Claude API. Check your internet connection and API key.
                </p>
              </div>
              <button
                onClick={() => setApiError(null)}
                className="text-red-400 hover:text-red-500 transition-colors p-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-gray-700 hover:text-gray-900 border border-gray-200/50 hover:border-gray-300/50 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300/50 hidden sm:block" />
            
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800">AI Specification Builder</h1>
              <p className="text-sm text-gray-600">
                Building comprehensive specifications through guided conversation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-700">Overall Progress</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {overallConfidence}%
              </div>
            </div>
            
            <button
              onClick={handleGenerateSpec}
              disabled={!canGenerateSpec}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 
                ${canGenerateSpec 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95' 
                  : 'bg-gray-100/80 text-gray-400 cursor-not-allowed backdrop-blur-sm'
                }
              `}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">
                {canGenerateSpec ? 'Generate Spec' : 'Keep Chatting'}
              </span>
              <span className="sm:hidden">
                {canGenerateSpec ? 'Generate' : 'Chat'}
              </span>
              {canGenerateSpec && <Sparkles className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <MessageList 
            messages={messages} 
            isLoading={isLoading}
            messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
          />
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>

        {/* Modern Confidence Sidebar - Hidden on mobile, visible on larger screens */}
        <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0 bg-white/80 backdrop-blur-xl border-l border-gray-200/50">
          <ConfidencePanel 
            confidence={confidence}
            overallConfidence={overallConfidence}
            canGenerateSpec={canGenerateSpec}
            specificationContext={specificationContext}
          />
        </div>
      </div>
      
      {/* Mobile Progress Button */}
      <button
        onClick={() => setShowMobileProgress(true)}
        className={`lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-2xl shadow-indigo-500/25 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-110 active:scale-95 z-50 ${overallConfidence >= 80 ? 'button-sparkle' : ''}`}
      >
        <div className="text-xs font-bold">{overallConfidence}%</div>
        <div className="w-8 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${overallConfidence}%` }}
          />
        </div>
      </button>

      {/* Mobile Progress Panel Overlay */}
      {showMobileProgress && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileProgress(false)}
          />
          
          {/* Panel */}
          <div className="relative ml-auto w-full max-w-sm bg-white/95 backdrop-blur-xl h-full overflow-y-auto animate-slide-in">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Progress Tracker</h2>
                <button
                  onClick={() => setShowMobileProgress(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
              
              <ConfidencePanel 
                confidence={confidence}
                overallConfidence={overallConfidence}
                canGenerateSpec={canGenerateSpec}
                specificationContext={specificationContext}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};