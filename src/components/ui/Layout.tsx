import React from 'react';
import { Sparkles, Brain } from 'lucide-react';
import type { LayoutProps } from '../../types';

export const Layout: React.FC<LayoutProps> = ({
  children,
  showProgress = false,
  currentStep = 0,
  totalSteps = 4,
}) => {
  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-glow opacity-40" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-secondary-400/10 to-primary-400/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse-soft animation-delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-elegant">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full animate-pulse-soft">
                  <Sparkles className="w-2.5 h-2.5 text-white m-auto mt-0.5" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  AI Specification Assistant
                </h1>
                <p className="text-xs text-neutral-500 font-medium">
                  Powered by Claude AI
                </p>
              </div>
            </div>
            
            {showProgress && (
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-neutral-600">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <div className="w-40 h-2 bg-white/60 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500 ease-out shadow-glow"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-primary-600">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                
                {/* Step indicators */}
                <div className="hidden md:flex items-center space-x-2">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={`progress-ring ${
                        index + 1 < currentStep ? 'completed' :
                        index + 1 === currentStep ? 'active' : ''
                      }`}
                    >
                      {index + 1 < currentStep ? '✓' : index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/20 backdrop-blur-lg border-t border-white/20 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold text-neutral-600">
                Built to help you create comprehensive software specifications with confidence
              </span>
              <Sparkles className="w-4 h-4 text-secondary-500" />
            </div>
            <p className="text-xs text-neutral-500">
              Transform your ideas into production-ready specifications with AI guidance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};