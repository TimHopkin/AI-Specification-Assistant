import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ConfidencePanel } from './ConfidencePanel';
import { useApp } from '../../contexts/AppContext';
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
  const { state } = useApp();
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
  let claudeApi: any = null;
  try {
    claudeApi = useClaudeApi();
  } catch (error) {
    // API not configured - we'll show an error state
    console.error('Claude API not available:', error);
  }

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-neutral-200/60 px-6 py-4">
        {/* API Error Banner */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">API Connection Issue</p>
                <p className="text-xs text-red-600 mt-1">
                  Having trouble connecting to Claude API. Check your internet connection and API key.
                </p>
              </div>
              <button
                onClick={() => setApiError(null)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-neutral-600 hover:text-neutral-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="h-6 w-px bg-neutral-300" />
            
            <div>
              <h1 className="text-xl font-bold text-neutral-800">AI Specification Builder</h1>
              <p className="text-sm text-neutral-600">
                Building comprehensive specifications through guided conversation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-neutral-700">Overall Progress</div>
              <div className="text-2xl font-bold gradient-text">{overallConfidence}%</div>
            </div>
            
            <Button
              onClick={handleGenerateSpec}
              disabled={!canGenerateSpec}
              variant={canGenerateSpec ? 'primary' : 'secondary'}
              className="relative group"
            >
              <Download className="w-4 h-4 mr-2" />
              {canGenerateSpec ? 'Generate Spec' : 'Keep Chatting'}
              {canGenerateSpec && <Sparkles className="w-4 h-4 ml-2 group-hover:animate-bounce-gentle" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <MessageList 
            messages={messages} 
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>

        {/* Confidence Sidebar */}
        <div className="w-80 flex-shrink-0 bg-white/60 backdrop-blur-sm border-l border-neutral-200/60">
          <ConfidencePanel 
            confidence={confidence}
            overallConfidence={overallConfidence}
            canGenerateSpec={canGenerateSpec}
            specificationContext={specificationContext}
          />
        </div>
      </div>
    </div>
  );
};