import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { StepProps } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { CheckCircle, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

export const VerificationStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { state, actions } = useApp();
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<{
    cursor: 'pending' | 'success' | 'warning';
    git: 'pending' | 'success' | 'warning';
    github: 'pending' | 'success' | 'warning';
    apiKey: 'pending' | 'success' | 'error';
  }>({
    cursor: 'pending',
    git: 'pending',
    github: 'pending',
    apiKey: 'pending',
  });

  const tests = [
    {
      id: 'cursor' as keyof typeof testResults,
      name: 'Cursor IDE',
      description: 'Development environment ready',
      installed: state.toolsInstallation.cursor,
    },
    {
      id: 'git' as keyof typeof testResults,
      name: 'Git Version Control',
      description: 'Code versioning system available',
      installed: state.toolsInstallation.git,
    },
    {
      id: 'github' as keyof typeof testResults,
      name: 'GitHub Account',
      description: 'Code hosting platform configured',
      installed: state.toolsInstallation.github,
    },
    {
      id: 'apiKey' as keyof typeof testResults,
      name: 'Claude API Connection',
      description: 'AI assistance ready to use',
      installed: state.apiConfiguration.isValid,
    },
  ];

  const runVerificationTests = async () => {
    setIsRunningTests(true);
    
    // Simulate running verification tests
    const delays = [500, 800, 1200, 1500];
    
    for (let i = 0; i < tests.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delays[i]));
      const test = tests[i];
      
      setTestResults(prev => ({
        ...prev,
        [test.id]: test.installed ? 
          (test.id === 'apiKey' ? 'success' : 'success') : 
          (test.id === 'apiKey' ? 'error' : 'warning')
      }));
    }
    
    setIsRunningTests(false);
  };

  useEffect(() => {
    // Auto-run tests when component mounts
    runVerificationTests();
  }, []);

  const allTestsPassed = Object.values(testResults).every(result => result === 'success');
  const hasErrors = Object.values(testResults).some(result => result === 'error');

  const completeSetup = () => {
    actions.completeSetup();
    actions.setSetupProgress({ verification: true, completed: true });
    
    // Create a default user profile
    actions.setUser({
      id: crypto.randomUUID(),
      name: 'Developer',
      createdAt: new Date(),
      preferences: {
        language: 'en-GB',
        theme: 'light',
      },
    });
    
    onNext();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin" />
        );
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'success':
        return 'Ready';
      case 'warning':
        return 'Optional - can proceed';
      case 'error':
        return 'Needs attention';
      default:
        return 'Testing...';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Setup Verification
        </h2>
        <p className="text-lg text-gray-600">
          Let's verify everything is configured correctly and ready to use
        </p>
      </div>

      <Card className="mb-8">
        <div className="space-y-4">
          {tests.map((test) => {
            const status = testResults[test.id];
            return (
              <div key={test.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{test.name}</h3>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    status === 'success' ? 'text-green-600' : 
                    status === 'warning' ? 'text-yellow-600' : 
                    status === 'error' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {getStatusMessage(status)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {!isRunningTests && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              onClick={runVerificationTests}
              variant="secondary"
              size="sm"
            >
              Run Tests Again
            </Button>
          </div>
        )}
      </Card>

      {/* Results Summary */}
      {!isRunningTests && (
        <Card className={`mb-8 ${
          allTestsPassed ? 'bg-green-50 border-green-200' : 
          hasErrors ? 'bg-red-50 border-red-200' : 
          'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {allTestsPassed ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : hasErrors ? (
                <AlertTriangle className="w-6 h-6 text-red-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              )}
            </div>
            <div>
              <h3 className={`font-medium ${
                allTestsPassed ? 'text-green-800' : 
                hasErrors ? 'text-red-800' : 'text-yellow-800'
              }`}>
                {allTestsPassed ? 'Perfect! Everything is ready' : 
                 hasErrors ? 'Some issues need attention' : 
                 'Good to go with minor notes'}
              </h3>
              <p className={`text-sm mt-1 ${
                allTestsPassed ? 'text-green-700' : 
                hasErrors ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {allTestsPassed ? 
                  'Your development environment is fully configured and ready for AI-assisted specification creation.' :
                  hasErrors ?
                  'Please resolve the API key issue to continue. Other tools can be installed later.' :
                  'You can proceed with the current setup. Missing tools can be installed as needed.'
                }
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* What's Next */}
      {!isRunningTests && (allTestsPassed || !hasErrors) && (
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-primary-900 mb-2">
                Ready to Create Your First Specification
              </h3>
              <p className="text-sm text-primary-800 mb-4">
                You'll now enter the main application where you can:
              </p>
              <ul className="text-sm text-primary-800 space-y-1 mb-4">
                <li className="flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Chat with our AI mentor to define your project
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Build comprehensive specifications step-by-step
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Export optimised specifications for Claude Code
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  Track confidence levels across all project areas
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-center">
          <Button
            onClick={completeSetup}
            disabled={hasErrors}
            size="lg"
            className="px-8"
          >
            {hasErrors ? 'Resolve Issues First' : 'Complete Setup'}
          </Button>
          {!hasErrors && (
            <p className="text-sm text-gray-500 mt-2">
              Welcome to AI Specification Assistant!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};