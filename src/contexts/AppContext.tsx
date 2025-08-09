import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppState, User, UserPreferences, SetupProgress, ToolInstallation, ApiConfiguration } from '../types';
import { saveToStorage, loadFromStorage } from '../utils/storage';

// Initial state
const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  setupProgress: {
    welcome: false,
    toolsInstallation: false,
    apiConfiguration: false,
    verification: false,
    completed: false,
  },
  toolsInstallation: {
    cursor: false,
    git: false,
    github: false,
  },
  apiConfiguration: {
    anthropicApiKey: '',
    isValid: false,
  },
};

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_SETUP_PROGRESS'; payload: Partial<SetupProgress> }
  | { type: 'SET_TOOLS_INSTALLATION'; payload: Partial<ToolInstallation> }
  | { type: 'SET_API_CONFIGURATION'; payload: Partial<ApiConfiguration> }
  | { type: 'SET_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'COMPLETE_SETUP' }
  | { type: 'RESET_STATE' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SET_SETUP_PROGRESS':
      return {
        ...state,
        setupProgress: { ...state.setupProgress, ...action.payload },
      };
    case 'SET_TOOLS_INSTALLATION':
      return {
        ...state,
        toolsInstallation: { ...state.toolsInstallation, ...action.payload },
      };
    case 'SET_API_CONFIGURATION':
      return {
        ...state,
        apiConfiguration: { ...state.apiConfiguration, ...action.payload },
      };
    case 'SET_USER_PREFERENCES':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            preferences: { ...state.user.preferences, ...action.payload },
          },
        };
      }
      return state;
    case 'COMPLETE_SETUP':
      return {
        ...state,
        setupProgress: { ...state.setupProgress, completed: true },
      };
    case 'RESET_STATE':
      return initialState;
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    setUser: (user: User) => void;
    setSetupProgress: (progress: Partial<SetupProgress>) => void;
    setToolsInstallation: (tools: Partial<ToolInstallation>) => void;
    setApiConfiguration: (config: Partial<ApiConfiguration>) => void;
    setUserPreferences: (preferences: Partial<UserPreferences>) => void;
    completeSetup: () => void;
    resetState: () => void;
  };
} | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = loadFromStorage('appState');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state.isAuthenticated || state.setupProgress.welcome) {
      saveToStorage('appState', state);
    }
  }, [state]);

  // Action creators
  const actions = {
    setUser: (user: User) => dispatch({ type: 'SET_USER', payload: user }),
    setSetupProgress: (progress: Partial<SetupProgress>) =>
      dispatch({ type: 'SET_SETUP_PROGRESS', payload: progress }),
    setToolsInstallation: (tools: Partial<ToolInstallation>) =>
      dispatch({ type: 'SET_TOOLS_INSTALLATION', payload: tools }),
    setApiConfiguration: (config: Partial<ApiConfiguration>) =>
      dispatch({ type: 'SET_API_CONFIGURATION', payload: config }),
    setUserPreferences: (preferences: Partial<UserPreferences>) =>
      dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences }),
    completeSetup: () => dispatch({ type: 'COMPLETE_SETUP' }),
    resetState: () => dispatch({ type: 'RESET_STATE' }),
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};