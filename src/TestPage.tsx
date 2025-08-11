import React from 'react';

export const TestPage: React.FC = () => {
  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          color: 'white',
          maxWidth: '500px',
          animation: 'float 3s ease-in-out infinite'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
          🚀 UI Test Page
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
          If you can see this glassmorphism effect with gradients and blur, 
          the UI blocker can be bypassed!
        </p>
        <div 
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          Modern UI Test Button
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};