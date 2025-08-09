import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { StepProps } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { Eye, EyeOff, ExternalLink, CheckCircle, AlertCircle, Key } from 'lucide-react';

export const ApiConfigurationStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { state, actions } = useApp();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState(state.apiConfiguration.anthropicApiKey);
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      setValidationMessage('Please enter your API key');
      return;
    }

    setIsValidating(true);
    setValidationMessage('');

    try {
      // Simulate API key validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Basic format validation (Anthropic API keys typically start with 'sk-ant-')
      const isValidFormat = apiKey.startsWith('sk-ant-') && apiKey.length > 20;
      
      if (isValidFormat) {
        actions.setApiConfiguration({
          anthropicApiKey: apiKey,
          isValid: true,
          lastValidated: new Date(),
        });
        actions.setSetupProgress({ apiConfiguration: true });
        setValidationMessage('API key validated successfully!');
        setTimeout(() => {
          onNext();
        }, 1000);
      } else {
        setValidationMessage('Invalid API key format. Please check your key and try again.');
        actions.setApiConfiguration({
          anthropicApiKey: apiKey,
          isValid: false,
        });
      }
    } catch (error) {
      setValidationMessage('Failed to validate API key. Please check your internet connection.');
      actions.setApiConfiguration({
        anthropicApiKey: apiKey,
        isValid: false,
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    setValidationMessage('');
    actions.setApiConfiguration({ isValid: false });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          API Configuration
        </h2>
        <p className="text-lg text-gray-600">
          Connect to Claude API to enable AI-powered specification assistance
        </p>
      </div>

      {/* API Key Setup */}
      <Card className="mb-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Anthropic API Key
            </h3>
            <p className="text-gray-600 mb-4">
              Your API key enables secure communication with Claude AI. It's stored encrypted on your device.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {validationMessage && (
            <div className={`flex items-center space-x-2 text-sm ${
              state.apiConfiguration.isValid ? 'text-green-600' : 'text-red-600'
            }`}>
              {state.apiConfiguration.isValid ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{validationMessage}</span>
            </div>
          )}

          <Button
            onClick={validateApiKey}
            isLoading={isValidating}
            disabled={!apiKey.trim()}
            className="w-full"
          >
            {isValidating ? 'Validating...' : 'Validate API Key'}
          </Button>
        </div>
      </Card>

      {/* How to get API key */}
      <Card className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          How to Get Your API Key
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium text-xs">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">Visit Anthropic Console</p>
              <p className="text-gray-600">
                Go to{' '}
                <a
                  href="https://console.anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 inline-flex items-center"
                >
                  console.anthropic.com <ExternalLink className="w-3 h-3 ml-1" />
                </a>{' '}
                and create an account
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium text-xs">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">Add Payment Method</p>
              <p className="text-gray-600">Add a payment method to enable API access (pay-per-use)</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium text-xs">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">Generate API Key</p>
              <p className="text-gray-600">Navigate to API Keys section and create a new key</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Cost Information */}
      <Card className="mb-8 bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800 mb-1">API Usage Costs</h3>
            <p className="text-sm text-yellow-700 mb-2">
              Typical costs for creating software specifications:
            </p>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Short conversation (basic app): ~£0.01-0.05</li>
              <li>• Medium conversation (web app): ~£0.05-0.15</li>
              <li>• Complex conversation (full system): ~£0.15-0.50</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-center">
          <Button
            onClick={onNext}
            disabled={!state.apiConfiguration.isValid}
            size="lg"
          >
            Continue to Verification
          </Button>
          {!state.apiConfiguration.isValid && (
            <p className="text-sm text-gray-500 mt-2">
              Please validate your API key to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};