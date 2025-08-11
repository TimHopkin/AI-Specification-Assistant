import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { ConfidencePanel } from './chat/ConfidencePanel';
import { useClaudeApi, type SpecificationContext, type ConfidenceMetrics } from '../services/claudeApi';
import { ArrowLeft, Download, Sparkles, AlertCircle, Settings } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const navigate = useNavigate();
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
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Premium Header matching home page */}
      <div style={{
        flexShrink: '0',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1rem 2rem'
      }}>
        {/* Modern API Error Banner */}
        {apiError && (
          <div style={{
            marginBottom: '1rem',
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle style={{ width: '16px', height: '16px', color: '#dc2626', flexShrink: '0' }} />
              <div style={{ flex: '1' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#dc2626' }}>API Connection Issue</p>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px', opacity: '0.8' }}>
                  Having trouble connecting to Claude API. Check your internet connection and API key.
                </p>
              </div>
              <button
                onClick={() => setApiError(null)}
                style={{ 
                  color: 'rgba(239, 68, 68, 0.6)', 
                  fontSize: '0.875rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
              Back to Dashboard
            </button>
            
            <div style={{ height: '24px', width: '1px', background: 'rgba(255, 255, 255, 0.3)' }} />
            
            <div>
              <h1 
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: 'white', 
                  margin: 0,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
              >
                AI Specification Builder
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                Building comprehensive specifications through guided conversation
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>Overall Progress</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#60a5fa' }}>{overallConfidence}%</div>
            </div>
            
            <button
              onClick={() => navigate('/settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Settings style={{ width: '16px', height: '16px' }} />
              Settings
            </button>

            <button
              onClick={handleGenerateSpec}
              disabled={!canGenerateSpec}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: canGenerateSpec 
                  ? 'linear-gradient(135deg, #ff6b6b, #feca57)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: canGenerateSpec 
                  ? 'none' 
                  : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: canGenerateSpec ? 'pointer' : 'not-allowed',
                opacity: canGenerateSpec ? '1' : '0.5',
                boxShadow: canGenerateSpec ? '0 4px 12px rgba(255, 107, 107, 0.4)' : 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (canGenerateSpec) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (canGenerateSpec) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.4)';
                }
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} />
              {canGenerateSpec ? 'Generate Spec' : 'Keep Chatting'}
              {canGenerateSpec && <Sparkles style={{ width: '16px', height: '16px' }} />}
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: '1', display: 'flex', overflow: 'hidden' }}>
        {/* Main Chat Area with Premium Styling */}
        <div style={{ 
          flex: '1', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          minWidth: 0
        }}>
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

        {/* Premium Confidence Sidebar - Hidden on mobile, visible on larger screens */}
        <div style={{
          width: window.innerWidth > 1024 ? '320px' : '0',
          flexShrink: '0',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
          display: window.innerWidth > 1024 ? 'block' : 'none'
        }}>
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
        style={{
          display: window.innerWidth <= 1024 ? 'flex' : 'none',
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '4rem',
          height: '4rem',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          color: 'white',
          borderRadius: '2rem',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          border: 'none',
          zIndex: 50
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.4)';
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: '700' }}>{overallConfidence}%</div>
        <div style={{ width: '2rem', height: '0.25rem', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '0.125rem', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${overallConfidence}%`, 
              background: 'white', 
              borderRadius: '0.125rem',
              transition: 'width 0.7s ease'
            }}
          />
        </div>
      </button>

      {/* Mobile Progress Panel Overlay */}
      {showMobileProgress && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex'
        }}>
          {/* Backdrop */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setShowMobileProgress(false)}
          />
          
          {/* Panel */}
          <div style={{
            position: 'relative',
            marginLeft: 'auto',
            width: '100%',
            maxWidth: '24rem',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            height: '100%',
            overflowY: 'auto',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937' }}>Progress Tracker</h2>
                <button
                  onClick={() => setShowMobileProgress(false)}
                  style={{
                    width: '2rem',
                    height: '2rem',
                    background: '#f3f4f6',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease',
                    cursor: 'pointer',
                    border: 'none',
                    fontSize: '1.25rem',
                    color: '#6b7280'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                  }}
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