import React, { useState } from 'react';
import { Layout } from './ui/Layout';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ChatInterface } from './chat/ChatInterface';
import { useApp } from '../contexts/AppContext';
import { MessageSquare, Settings, HelpCircle, Sparkles, Brain, Zap, Shield, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export const MainApp: React.FC = () => {
  const { state, actions } = useApp();
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat'>('dashboard');

  const handleStartSpecification = () => {
    setCurrentView('chat');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Show chat interface if user clicked "Begin Specification"
  if (currentView === 'chat') {
    return <ChatInterface onBack={handleBackToDashboard} />;
  }

  const handleOpenSettings = () => {
    // Settings functionality
    console.log('Opening settings...');
  };

  const confidenceCategories = [
    { name: 'Technical Architecture', progress: 0 },
    { name: 'User Experience', progress: 0 },
    { name: 'Business Logic', progress: 0 },
    { name: 'Development Environment', progress: 100 },
    { name: 'Security & Compliance', progress: 0 },
    { name: 'Performance & Scaling', progress: 0 },
  ];

  const overallConfidence = Math.round(
    confidenceCategories.reduce((sum, cat) => sum + cat.progress, 0) / confidenceCategories.length
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <Brain className="w-80 h-80 text-primary-500" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-100 to-primary-100 rounded-full px-4 py-2 mb-6 animate-bounce-gentle">
              <CheckCircle2 className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-semibold text-neutral-700">
                Setup Complete
              </span>
              <Sparkles className="w-4 h-4 text-primary-600" />
            </div>
            
            <h1 className="text-5xl font-bold mb-6">
              <span className="gradient-text">Welcome back,</span>
              <br />
              <span className="text-neutral-800">{state.user?.name || 'Developer'}!</span>
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Ready to create your next <span className="font-semibold text-primary-600">comprehensive software specification</span>? 
              Let's build something amazing with AI guidance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Start New Specification - Hero Card */}
            <Card variant="gradient" className="text-center py-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-primary-500/5" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow animate-pulse-soft">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-neutral-800 mb-3">
                  Create New Specification
                </h2>
                <p className="text-neutral-600 mb-8 max-w-lg leading-relaxed text-lg">
                  Start a guided conversation with our AI mentor to build a comprehensive specification for your next project.
                </p>
                
                <Button
                  onClick={handleStartSpecification}
                  size="lg"
                  className="px-12 py-4 text-lg shadow-elegant-lg group"
                >
                  <MessageSquare className="w-6 h-6 mr-3 group-hover:animate-bounce-gentle" />
                  Begin Specification
                </Button>
                
                <p className="text-sm text-neutral-500 mt-4">
                  AI-powered • Comprehensive • Optimised for Claude Code
                </p>
              </div>
            </Card>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="elevated" className="group hover:shadow-glow transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">
                    <Settings className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-800 mb-1">Settings & Configuration</h3>
                    <p className="text-sm text-neutral-600">Manage API keys, preferences, and account settings</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleOpenSettings}
                    className="group-hover:bg-primary-50 group-hover:text-primary-700"
                  >
                    Configure
                  </Button>
                </div>
              </Card>

              <Card variant="elevated" className="group hover:shadow-glow transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">
                    <HelpCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-800 mb-1">Help & Documentation</h3>
                    <p className="text-sm text-neutral-600">Learn best practices, workflows, and advanced tips</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open('https://docs.anthropic.com/claude-code', '_blank')}
                    className="group-hover:bg-accent-50 group-hover:text-accent-700"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Confidence Tracker */}
            <Card variant="elevated" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-neutral-800 text-lg">Specification Progress</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-700">Overall Confidence</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold gradient-text">{overallConfidence}%</span>
                      <TrendingUp className="w-4 h-4 text-accent-500" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full h-3 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full transition-all duration-700 ease-out shadow-glow"
                        style={{ width: `${overallConfidence}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    {confidenceCategories.map((category, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-neutral-600 group-hover:text-neutral-800 transition-colors font-medium">
                            {category.name}
                          </span>
                          <span className="text-neutral-500 font-semibold">
                            {category.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              category.progress > 0 
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow' 
                                : 'bg-neutral-200'
                            }`}
                            style={{ width: `${category.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Development Environment Status */}
            <Card variant="elevated">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-neutral-800 text-lg">Development Environment</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Cursor IDE', status: state.toolsInstallation.cursor, icon: Zap },
                  { name: 'Git', status: state.toolsInstallation.git, icon: Shield },
                  { name: 'GitHub', status: state.toolsInstallation.github, icon: Target },
                  { name: 'Claude API', status: state.apiConfiguration.isValid, icon: Brain, critical: true }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-white group hover:from-white hover:to-neutral-50 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        item.status 
                          ? 'bg-gradient-to-r from-accent-500 to-accent-600 shadow-elegant' 
                          : 'bg-neutral-200'
                      }`}>
                        <item.icon className={`w-4 h-4 ${item.status ? 'text-white' : 'text-neutral-400'}`} />
                      </div>
                      <span className="text-neutral-700 font-medium group-hover:text-neutral-900 transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                        item.status 
                          ? 'text-accent-700 bg-accent-100' 
                          : item.critical
                            ? 'text-red-700 bg-red-100'
                            : 'text-neutral-500 bg-neutral-100'
                      }`}>
                        {item.status ? 'Ready' : item.critical ? 'Required' : 'Optional'}
                      </span>
                      {item.status && <CheckCircle2 className="w-4 h-4 text-accent-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* User Preferences */}
            <Card variant="glass">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-neutral-800 text-lg">Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">Language Preference</label>
                  <select
                    value={state.user?.preferences.language || 'en-GB'}
                    onChange={(e) => actions.setUserPreferences({ language: e.target.value as 'en-GB' | 'en-US' })}
                    className="input-field text-sm"
                  >
                    <option value="en-GB">🇬🇧 British English</option>
                    <option value="en-US">🇺🇸 American English</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};