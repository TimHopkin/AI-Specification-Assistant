// User and authentication types
export interface User {
  id: string;
  email?: string;
  name?: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: 'en-GB' | 'en-US';
  theme: 'light' | 'dark';
}

// Setup and onboarding types
export interface SetupProgress {
  welcome: boolean;
  toolsInstallation: boolean;
  apiConfiguration: boolean;
  verification: boolean;
  completed: boolean;
}

export interface ToolInstallation {
  cursor: boolean;
  claudeCode: boolean;
  git: boolean;
  github: boolean;
}

export interface ApiConfiguration {
  anthropicApiKey: string;
  isValid: boolean;
  lastValidated?: Date;
}

// Application state types
export interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  setupProgress: SetupProgress;
  toolsInstallation: ToolInstallation;
  apiConfiguration: ApiConfiguration;
}

// Component props types
export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}