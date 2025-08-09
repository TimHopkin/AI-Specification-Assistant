import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useApp } from '../contexts/AppContext';

// Test component that uses the context
const TestComponent = () => {
  const { state, actions } = useApp();
  
  return (
    <div>
      <div data-testid="auth-status">
        {state.isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="setup-progress">
        {state.setupProgress.welcome ? 'welcome-completed' : 'welcome-pending'}
      </div>
      <button 
        onClick={() => actions.setSetupProgress({ welcome: true })}
        data-testid="complete-welcome"
      >
        Complete Welcome
      </button>
    </div>
  );
};

describe('AppContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('provides initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('setup-progress')).toHaveTextContent('welcome-pending');
  });

  it('updates setup progress', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByTestId('complete-welcome').click();
    });

    expect(screen.getByTestId('setup-progress')).toHaveTextContent('welcome-completed');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useApp must be used within an AppProvider');
    
    consoleSpy.mockRestore();
  });
});