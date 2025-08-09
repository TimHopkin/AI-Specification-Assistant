import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { StepProps } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { CheckCircle, ExternalLink, Download, Terminal, Github } from 'lucide-react';

export const ToolsInstallationStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { state, actions } = useApp();
  const [isValidating, setIsValidating] = useState(false);

  const tools = [
    {
      id: 'cursor' as keyof typeof state.toolsInstallation,
      name: 'Cursor IDE',
      description: 'AI-powered code editor optimised for Claude Code integration',
      downloadUrl: 'https://cursor.sh',
      isInstalled: state.toolsInstallation.cursor,
      icon: Download,
      instructions: [
        'Visit cursor.sh and download the installer',
        'Run the installer and follow setup instructions',
        'Launch Cursor and complete the initial setup',
      ],
    },
    {
      id: 'git' as keyof typeof state.toolsInstallation,
      name: 'Git',
      description: 'Version control system for tracking code changes',
      downloadUrl: 'https://git-scm.com/downloads',
      isInstalled: state.toolsInstallation.git,
      icon: Terminal,
      instructions: [
        'Download Git from the official website',
        'Install with default settings',
        'Open terminal and run "git --version" to verify',
      ],
    },
    {
      id: 'github' as keyof typeof state.toolsInstallation,
      name: 'GitHub Account',
      description: 'Code hosting and collaboration platform',
      downloadUrl: 'https://github.com/signup',
      isInstalled: state.toolsInstallation.github,
      icon: Github,
      instructions: [
        'Create free GitHub account at github.com',
        'Verify your email address',
        'Consider enabling two-factor authentication',
      ],
    },
  ];

  const handleToolToggle = (toolId: keyof typeof state.toolsInstallation) => {
    actions.setToolsInstallation({
      [toolId]: !state.toolsInstallation[toolId],
    });
  };

  const validateInstallation = async () => {
    setIsValidating(true);
    // Simulate validation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsValidating(false);
    
    const allToolsInstalled = Object.values(state.toolsInstallation).every(Boolean);
    if (allToolsInstalled) {
      actions.setSetupProgress({ toolsInstallation: true });
      onNext();
    }
  };


  const allToolsInstalled = Object.values(state.toolsInstallation).every(Boolean);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Development Tools Setup
        </h2>
        <p className="text-lg text-gray-600">
          Let's install the essential tools you'll need to build software with AI assistance
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    tool.isInstalled ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {tool.isInstalled ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <tool.icon className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {tool.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <a
                        href={tool.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                      >
                        Download <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={tool.isInstalled}
                          onChange={() => handleToolToggle(tool.id)}
                          className="form-checkbox h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Installed</span>
                      </label>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{tool.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Installation Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      {tool.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Special note about Claude Code extension */}
      <Card className="mb-8 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">Claude Code Extension</h3>
            <p className="text-sm text-blue-700">
              After installing Cursor, the Claude Code extension will be available in the marketplace. 
              We'll help you set this up in the next step along with your API configuration.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            {allToolsInstalled ? 
              'Great! All tools are installed. Ready to proceed?' :
              `${Object.values(state.toolsInstallation).filter(Boolean).length} of ${Object.keys(state.toolsInstallation).length} tools installed`
            }
          </p>
          
          <Button
            onClick={validateInstallation}
            disabled={!allToolsInstalled}
            isLoading={isValidating}
            size="lg"
          >
            {isValidating ? 'Validating Installation...' : 'Continue to API Setup'}
          </Button>
        </div>
      </div>
    </div>
  );
};