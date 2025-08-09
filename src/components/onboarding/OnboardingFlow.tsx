import React, { useState, useEffect } from 'react';
import { Layout } from '../ui/Layout';
import { WelcomeStep } from './WelcomeStep';
import { ToolsInstallationStep } from './ToolsInstallationStep';
import { ApiConfigurationStep } from './ApiConfigurationStep';
import { VerificationStep } from './VerificationStep';
import { useApp } from '../../contexts/AppContext';

const steps = [
  { id: 'welcome', component: WelcomeStep, title: 'Welcome' },
  { id: 'tools', component: ToolsInstallationStep, title: 'Tools Installation' },
  { id: 'api', component: ApiConfigurationStep, title: 'API Configuration' },
  { id: 'verification', component: VerificationStep, title: 'Verification' },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { state, actions } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Determine starting step based on progress
  useEffect(() => {
    const progress = state.setupProgress;
    if (progress.verification || progress.completed) {
      onComplete();
    } else if (progress.apiConfiguration) {
      setCurrentStepIndex(3); // verification
    } else if (progress.toolsInstallation) {
      setCurrentStepIndex(2); // api config
    } else if (progress.welcome) {
      setCurrentStepIndex(1); // tools
    } else {
      setCurrentStepIndex(0); // welcome
    }
  }, [state.setupProgress, onComplete]);

  const currentStep = steps[currentStepIndex];
  const StepComponent = currentStep.component;

  const handleNext = () => {
    if (currentStepIndex === 0) {
      actions.setSetupProgress({ welcome: true });
    }
    
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <Layout 
      showProgress={true} 
      currentStep={currentStepIndex + 1} 
      totalSteps={steps.length}
    >
      <StepComponent
        onNext={handleNext}
        onBack={currentStepIndex > 0 ? handleBack : undefined}
      />
    </Layout>
  );
};