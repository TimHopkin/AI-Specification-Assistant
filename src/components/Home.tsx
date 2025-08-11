import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartSpecification = () => {
    navigate('/dashboard');
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
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '1.5rem', 
          fontWeight: '700',
          margin: 0
        }}>
          AI Specification Assistant
        </h1>
      </nav>

      {/* Premium Hero Section */}
      <div style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Main Content */}
        <div>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Build Software Specifications with AI
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Transform your ideas into comprehensive specifications through guided AI conversations. Perfect for beginners and professionals.
          </p>

          <button
            onClick={handleStartSpecification}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1.2rem',
              padding: '16px 32px',
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
            }}
          >
            🚀 Begin Specification
          </button>
        </div>

        {/* Premium Feature Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1.5rem'
          }}>
            ✨ AI-Powered Features
          </h3>

          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '2'
          }}>
            <li>🧠 Intelligent gap analysis</li>
            <li>📝 Comprehensive documentation</li>
            <li>🔧 Claude Code ready output</li>
            <li>🚀 Professional specifications</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
};