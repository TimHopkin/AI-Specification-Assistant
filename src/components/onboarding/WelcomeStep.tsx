import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { StepProps } from '../../types';
import { CheckCircle, Code2, MessageSquare, Sparkles, Zap, Brain, Rocket, Shield } from 'lucide-react';

export const WelcomeStep: React.FC<StepProps> = ({ onNext }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Guided Specification',
      description: 'Chat with our compassionate AI mentor to build comprehensive software specifications step by step.',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100',
    },
    {
      icon: Zap,
      title: 'Claude Code Integration',
      description: 'Generate specifications optimised for Claude Code development, reducing token waste and build failures.',
      gradient: 'from-secondary-500 to-secondary-600',
      bgGradient: 'from-secondary-50 to-secondary-100',
    },
    {
      icon: Shield,
      title: 'Complete Setup Guidance',
      description: 'From tool installation to API configuration - we\'ll guide you through everything needed to start building.',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100',
    },
    {
      icon: Sparkles,
      title: 'Built for Beginners',
      description: 'No technical background required. Learn development best practices whilst creating your first specification.',
      gradient: 'from-orange-500 to-pink-500',
      bgGradient: 'from-orange-50 to-pink-50',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Brain className="w-96 h-96 text-primary-500" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-4 py-2 mb-6 animate-bounce-gentle">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              Powered by Claude AI
            </span>
            <Sparkles className="w-4 h-4 text-secondary-600" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Welcome to</span>
            <br />
            <span className="text-neutral-800">AI Specification Assistant</span>
          </h1>
          
          <p className="text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your software ideas into <span className="font-semibold text-primary-600">comprehensive specifications</span> that Claude Code can build perfectly
          </p>
          
          {/* Journey Steps */}
          <Card variant="gradient" className="p-8 mb-12">
            <div className="text-center mb-6">
              <Rocket className="w-8 h-8 mx-auto text-primary-600 mb-3" />
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Complete Development Journey</h2>
              <p className="text-neutral-600">From idea to deployed application in 4 simple steps</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Setup Tools', icon: Shield, desc: 'Install & configure development environment' },
                { step: 2, title: 'Create Specification', icon: Brain, desc: 'AI-guided spec creation process' },
                { step: 3, title: 'Build with Claude Code', icon: Zap, desc: 'Transform specs into working code' },
                { step: 4, title: 'Deploy & Share', icon: Rocket, desc: 'Launch your application live' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:scale-110">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2 text-center">{item.title}</h3>
                  <p className="text-sm text-neutral-600 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} variant="gradient" className="h-full group">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-neutral-900 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-200">
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Learning Outcomes */}
      <Card variant="elevated" className="mb-12 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl mb-4 shadow-glow">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-neutral-800 mb-2">
            What You'll Master
          </h3>
          <p className="text-neutral-600">Essential skills for modern software development</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Development Workflow',
              description: 'Understanding the complete software development process from idea to deployment.',
              icon: Code2,
              color: 'primary'
            },
            {
              title: 'Specification Best Practices',  
              description: 'How to create comprehensive specifications that prevent costly development iterations.',
              icon: Shield,
              color: 'secondary'
            },
            {
              title: 'AI-Assisted Development',
              description: 'Leveraging Claude Code effectively to build professional-quality applications.',
              icon: Brain,
              color: 'accent'
            }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-${item.color}-100 to-${item.color}-200 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <h4 className="font-bold text-neutral-800 mb-3 text-lg">{item.title}</h4>
              <p className="text-neutral-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Investment Info */}
      <Card variant="glass" className="mb-12 border-l-4 border-l-accent-400">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-800 mb-2">
              Time Investment & Costs
            </h3>
            <div className="space-y-2 text-neutral-600">
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                <span><strong>Initial setup:</strong> 1-2 hours</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span><strong>First specification:</strong> 30-60 minutes</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                <span><strong>Claude API costs:</strong> ~£0.01-0.10 per conversation</span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA Section */}
      <div className="text-center">
        <div className="mb-8">
          <Button onClick={onNext} size="lg" className="px-12 py-4 text-lg shadow-elegant-lg">
            <Rocket className="w-5 h-5 mr-3" />
            Begin Your Journey
          </Button>
        </div>
        
        <div className="inline-flex items-center space-x-3 text-neutral-500">
          <CheckCircle className="w-5 h-5 text-accent-500" />
          <span className="font-medium">
            Ready to transform how you build software? Let's set up your development environment.
          </span>
          <CheckCircle className="w-5 h-5 text-accent-500" />
        </div>
      </div>
    </div>
  );
};