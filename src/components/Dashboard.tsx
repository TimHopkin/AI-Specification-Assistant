import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Settings, HelpCircle, Brain, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  const handleStartSpecification = () => {
    navigate('/chat');
  };

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const confidenceCategories = [
    { name: 'Technical Architecture', progress: 0 },
    { name: 'User Experience', progress: 0 },
    { name: 'Business Logic', progress: 0 },
    { name: 'Development Environment', progress: 100 },
    { name: 'Security & Compliance', progress: 0 },
    { name: 'Performance & Scaling', progress: 0 },
  ];

  const overallConfidence = Math.round(
    confidenceCategories.reduce((sum, cat) => sum + cat.progress, 0) / confidenceCategories.length
  );

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
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleOpenSettings}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Settings style={{ width: '16px', height: '16px' }} />
            Settings
          </button>
        </div>
      </nav>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        {/* Premium Welcome Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '2rem',
            padding: '8px 16px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#16a34a' }}>Setup Complete</span>
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Welcome back, {state.user?.name || 'Developer'}!
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '512px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.7'
          }}>
            Ready to create your next <span style={{ fontWeight: '600', color: '#60a5fa' }}>comprehensive software specification</span>? 
            Let's build something amazing with AI guidance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '2fr 1fr' : '1fr',
          gap: '3rem'
        }}>
          {/* Main Action Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Premium Start New Specification Card */}
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                padding: '4rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37), 0 0 40px rgba(102, 126, 234, 0.15)',
                marginBottom: '3rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={handleStartSpecification}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(31, 38, 135, 0.4), 0 0 80px rgba(102, 126, 234, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37), 0 0 40px rgba(102, 126, 234, 0.15)';
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)'
                  }}
                >
                  <Brain style={{ width: '40px', height: '40px', color: 'white' }} />
                </div>
                
                <h2 
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '1rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  Create New Specification
                </h2>
                <p 
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '2rem',
                    maxWidth: '400px',
                    lineHeight: '1.6',
                    fontSize: '1.1rem'
                  }}
                >
                  Start a guided conversation with our AI mentor to build a comprehensive specification for your project.
                </p>
                
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: '500'
                  }}
                >
                  <span>✨ AI-powered</span>
                  <span>•</span>
                  <span>🔧 Comprehensive</span>
                  <span>•</span>
                  <span>🚀 Claude Code Ready</span>
                </div>
              </div>
            </div>

            {/* Premium Quick Actions Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={handleOpenSettings}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(31, 38, 135, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
                    <Settings style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <div style={{ flex: '1' }}>
                    <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>Settings & Configuration</h3>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>Manage API keys, preferences, and account settings</p>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => window.open('https://docs.anthropic.com/claude-code', '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(31, 38, 135, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                  }}>
                    <HelpCircle style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <div style={{ flex: '1' }}>
                    <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>Help & Documentation</h3>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>Learn best practices, workflows, and advanced tips</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Premium Confidence Tracker */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                }}>
                  <Target style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: 'white' }}>Specification Progress</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>Real-time confidence tracking</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>Overall Confidence</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#60a5fa' }}>{overallConfidence}%</span>
                    <TrendingUp style={{ width: '16px', height: '16px', color: '#10b981' }} />
                  </div>
                </div>
                
                <div style={{
                  height: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${overallConfidence}%`,
                      background: 'linear-gradient(90deg, #60a5fa, #8b5cf6)',
                      borderRadius: '6px',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {confidenceCategories.map((category, index) => (
                    <div key={index}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>
                          {category.name}
                        </span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '600' }}>
                          {category.progress}%
                        </span>
                      </div>
                      <div style={{
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${category.progress}%`,
                            background: category.progress === 0 
                              ? 'rgba(100, 116, 139, 0.3)' 
                              : 'linear-gradient(90deg, #60a5fa, #8b5cf6)',
                            borderRadius: '4px',
                            transition: 'width 0.5s ease',
                            opacity: category.progress === 0 ? '0.3' : '1'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};