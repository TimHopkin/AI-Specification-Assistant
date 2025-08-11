import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, Settings as SettingsIcon, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useApp();
  
  // API Key state
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  // User preferences state
  const [language, setLanguage] = useState('en-GB');
  const [theme, setTheme] = useState('default');

  // Load current settings on mount
  useEffect(() => {
    if (state.apiConfiguration.anthropicApiKey) {
      setApiKey(state.apiConfiguration.anthropicApiKey);
    }
    if (state.user?.preferences) {
      setLanguage(state.user.preferences.language || 'en-GB');
      setTheme(state.user.preferences.theme || 'default');
    }
  }, [state]);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setSaveMessage('Please enter your API key');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      // Save to context and storage
      actions.setApiConfiguration({
        anthropicApiKey: apiKey,
        isValid: false, // Will be validated separately
      });
      
      setSaveMessage('API key saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save API key. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      setValidationMessage('Please enter your API key');
      return;
    }

    setIsValidating(true);
    setValidationMessage('');

    try {
      // Basic format validation
      const isValidFormat = apiKey.startsWith('sk-ant-') && apiKey.length > 20;
      
      if (isValidFormat) {
        actions.setApiConfiguration({
          anthropicApiKey: apiKey,
          isValid: true,
          lastValidated: new Date(),
        });
        setValidationMessage('API key validated successfully!');
      } else {
        setValidationMessage('Invalid API key format. Please check your key.');
        actions.setApiConfiguration({
          anthropicApiKey: apiKey,
          isValid: false,
        });
      }
    } catch (error) {
      setValidationMessage('Failed to validate API key. Please check your connection.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSavePreferences = async () => {
    try {
      actions.setUserPreferences({
        language,
        theme,
      });
      setSaveMessage('Preferences updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save preferences. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Premium Navigation */}
      <nav style={{
        padding: '1rem 2rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 
          style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            margin: 0,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          AI Specification Assistant
        </h1>
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
      </nav>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)'
          }}>
            <SettingsIcon style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Settings & Configuration
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.7'
          }}>
            Manage your API keys, preferences, and account settings
          </p>
        </div>

        {/* Settings Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* API Configuration Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '3rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(31, 38, 135, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)'
              }}>
                <Key style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
                  API Configuration
                </h3>
                <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  Configure your Anthropic Claude API key for AI functionality
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                Anthropic API Key
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.875rem',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  {showApiKey ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                </button>
              </div>
              
              {(saveMessage || validationMessage) && (
                <div style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: saveMessage ? '#10b981' : validationMessage.includes('successfully') ? '#10b981' : '#ef4444'
                }}>
                  {saveMessage || validationMessage}
                </div>
              )}
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <span>Status:</span>
                {state.apiConfiguration.isValid ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981' }}>
                    <CheckCircle style={{ width: '12px', height: '12px' }} />
                    <span>Valid</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ef4444' }}>
                    <AlertCircle style={{ width: '12px', height: '12px' }} />
                    <span>Not validated</span>
                  </div>
                )}
              </div>
              
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '0.5rem',
                margin: 0
              }}>
                Get your API key from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>console.anthropic.com</a>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={handleSaveApiKey}
                disabled={isSaving || !apiKey.trim()}
                style={{
                  background: isSaving ? 'rgba(16, 185, 129, 0.5)' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  fontWeight: '600',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isSaving || !apiKey.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem',
                  opacity: isSaving || !apiKey.trim() ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSaving && apiKey.trim()) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isSaving ? 'Saving...' : 'Save Configuration'}
              </button>
              
              <button 
                onClick={validateApiKey}
                disabled={isValidating || !apiKey.trim()}
                style={{
                  background: isValidating ? 'rgba(59, 130, 246, 0.5)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  fontWeight: '600',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isValidating || !apiKey.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem',
                  opacity: isValidating || !apiKey.trim() ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isValidating && apiKey.trim()) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isValidating ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
          </div>

          {/* Development Tools Setup Guide */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '3rem',
            transition: 'all 0.3s ease',
            marginBottom: '2rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(31, 38, 135, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
              }}>
                <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
                  Development Environment Setup
                </h3>
                <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  Complete guide to install and configure your development tools
                </p>
              </div>
            </div>

            {/* Tools Installation Guide */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
                Required Development Tools
              </h4>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {/* Cursor IDE */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                      1. Cursor IDE - AI-Powered Code Editor
                    </h5>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>Download and install the AI-powered code editor:</p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                      <li>Visit <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>cursor.sh</a> and download for your platform</li>
                      <li>Run the installer and follow setup instructions</li>
                      <li>Launch Cursor and complete initial configuration</li>
                    </ul>
                  </div>
                </div>

                {/* Claude Code Extension */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                      2. Claude Code Extension Setup
                    </h5>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>Install and configure Claude AI integration:</p>
                    <ol style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                      <li>In Cursor, press <code style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 4px', borderRadius: '4px' }}>Cmd+Shift+X</code> (Mac) or <code style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 4px', borderRadius: '4px' }}>Ctrl+Shift+X</code> (Windows/Linux)</li>
                      <li>Search for "Claude Code" and install the official Anthropic extension</li>
                      <li>Open Command Palette: <code style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 4px', borderRadius: '4px' }}>Cmd/Ctrl+Shift+P</code></li>
                      <li>Type "Claude Code: Set API Key" and enter your Anthropic API key</li>
                      <li>Test with <code style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 4px', borderRadius: '4px' }}>Cmd/Ctrl+I</code> for inline chat</li>
                    </ol>
                  </div>
                </div>

                {/* Git & GitHub */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                      3. Git & GitHub Setup
                    </h5>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>Version control and code hosting:</p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                      <li>Download Git from <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>git-scm.com/downloads</a></li>
                      <li>Install with default settings</li>
                      <li>Create free GitHub account at <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>github.com</a></li>
                      <li>Verify installation: Open terminal and run <code style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 4px', borderRadius: '4px' }}>git --version</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Development Workflow */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
                🚀 Complete Development Workflow
              </h4>
              <ol style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.9)', margin: 0, paddingLeft: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Create software specification using this AI Specification Assistant</li>
                <li style={{ marginBottom: '0.5rem' }}>Copy the generated specification to your clipboard</li>
                <li style={{ marginBottom: '0.5rem' }}>Open Cursor IDE and create/open your project directory</li>
                <li style={{ marginBottom: '0.5rem' }}>Start Claude Code chat (<code style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 4px', borderRadius: '4px' }}>Cmd/Ctrl+L</code>)</li>
                <li style={{ marginBottom: '0.5rem' }}>Paste specification and begin development with AI assistance!</li>
                <li style={{ marginBottom: '0.5rem' }}>Use Git to track changes and GitHub to host your project</li>
              </ol>
            </div>
          </div>

          {/* User Preferences Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '3rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(31, 38, 135, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}>
                <User style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
                  User Preferences
                </h3>
                <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  Customize your experience and language preferences
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>
                  Language Preference
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="en-GB" style={{ background: '#1f2937', color: 'white' }}>🇬🇧 British English</option>
                  <option value="en-US" style={{ background: '#1f2937', color: 'white' }}>🇺🇸 American English</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>
                  Theme
                </label>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="default" style={{ background: '#1f2937', color: 'white' }}>Default Gradient</option>
                  <option value="dark" style={{ background: '#1f2937', color: 'white' }}>Dark Mode</option>
                  <option value="light" style={{ background: '#1f2937', color: 'white' }}>Light Mode</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleSavePreferences}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.875rem',
                marginTop: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};