import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, Settings as SettingsIcon, User } from 'lucide-react';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

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
              <input
                type="password"
                placeholder="sk-ant-api03-..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.875rem',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '0.5rem',
                margin: 0
              }}>
                Get your API key from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>console.anthropic.com</a>
              </p>
            </div>

            <button style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              fontWeight: '600',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.875rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              Save Configuration
            </button>
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
                <select style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}>
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
                <select style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}>
                  <option value="default" style={{ background: '#1f2937', color: 'white' }}>Default Gradient</option>
                  <option value="dark" style={{ background: '#1f2937', color: 'white' }}>Dark Mode</option>
                  <option value="light" style={{ background: '#1f2937', color: 'white' }}>Light Mode</option>
                </select>
              </div>
            </div>

            <button style={{
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
            }}>
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};