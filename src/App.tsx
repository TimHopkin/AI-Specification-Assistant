import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { MainApp } from './components/MainApp';

const AppContent: React.FC = () => {
  const { state } = useApp();

  // Show onboarding if setup is not completed
  if (!state.setupProgress.completed) {
    return (
      <OnboardingFlow
        onComplete={() => {
          // Setup completion is handled in the context
        }}
      />
    );
  }

  // Show main app if setup is completed
  return <MainApp />;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
