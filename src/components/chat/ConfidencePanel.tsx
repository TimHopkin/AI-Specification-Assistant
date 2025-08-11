import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Target, 
  TrendingUp, 
  Cpu, 
  Users, 
  Zap, 
  Shield, 
  Settings, 
  BarChart3,
  Download,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ConfidencePanelProps {
  confidence: {
    technicalArchitecture: number;
    userExperience: number;
    businessLogic: number;
    developmentEnvironment: number;
    securityCompliance: number;
    performanceScaling: number;
  };
  overallConfidence: number;
  canGenerateSpec: boolean;
  specificationContext?: {
    missingAreas?: string[];
    qualityScores?: any;
    domainSpecificTerms?: string[];
    lastAnalyzed?: Date;
  };
}

export const ConfidencePanel: React.FC<ConfidencePanelProps> = ({
  confidence,
  overallConfidence,
  canGenerateSpec,
  specificationContext,
}) => {
  const categories = [
    {
      key: 'technicalArchitecture' as keyof typeof confidence,
      name: 'Technical Architecture',
      icon: Cpu,
      progress: confidence.technicalArchitecture,
      description: 'Platform, database, API design',
    },
    {
      key: 'userExperience' as keyof typeof confidence,
      name: 'User Experience',
      icon: Users,
      progress: confidence.userExperience,
      description: 'UI/UX, workflows, accessibility',
    },
    {
      key: 'businessLogic' as keyof typeof confidence,
      name: 'Business Logic',
      icon: Zap,
      progress: confidence.businessLogic,
      description: 'Features, requirements, rules',
    },
    {
      key: 'developmentEnvironment' as keyof typeof confidence,
      name: 'Development Environment',
      icon: Settings,
      progress: confidence.developmentEnvironment,
      description: 'Tools, setup, configuration',
    },
    {
      key: 'securityCompliance' as keyof typeof confidence,
      name: 'Security & Compliance',
      icon: Shield,
      progress: confidence.securityCompliance,
      description: 'Authentication, data protection',
    },
    {
      key: 'performanceScaling' as keyof typeof confidence,
      name: 'Performance & Scaling',
      icon: BarChart3,
      progress: confidence.performanceScaling,
      description: 'Speed, capacity, optimization',
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-accent-500 to-accent-600';
    if (progress >= 60) return 'from-secondary-500 to-secondary-600';
    if (progress >= 40) return 'from-primary-500 to-primary-600';
    return 'from-neutral-400 to-neutral-500';
  };

  const getProgressIcon = (progress: number) => {
    if (progress >= 80) return <CheckCircle2 className="w-4 h-4 text-accent-500" />;
    if (progress >= 40) return <TrendingUp className="w-4 h-4 text-primary-500" />;
    return <AlertCircle className="w-4 h-4 text-neutral-400" />;
  };

  return (
    <div className="h-full overflow-y-auto p-6 glass-morphism-strong">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/20 via-transparent to-secondary-50/20 pointer-events-none" />
      
      <div className="space-y-6 relative z-10">
        {/* Enhanced Overall Progress Card */}
        <Card variant="beautiful" className="text-center relative overflow-hidden group animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/8 via-secondary-500/5 to-accent-500/8 animate-pulse-soft" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-glow-lg animate-glow-pulse relative">
                <Target className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-neutral-800 text-xl group-hover:text-shimmer transition-all duration-500">Overall Progress</h3>
                <p className="text-sm text-neutral-600">AI specification confidence</p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              {/* Enhanced progress display */}
              <div className="relative mb-4">
                <div className="text-5xl font-bold text-shimmer mb-3">{overallConfidence}%</div>
                {/* Circular progress indicator */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-neutral-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 32}`,
                        strokeDashoffset: `${2 * Math.PI * 32 * (1 - overallConfidence / 100)}`
                      }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              
              {/* Enhanced linear progress bar */}
              <div className="w-full h-4 bg-gradient-to-r from-neutral-200/50 to-neutral-100/50 rounded-full overflow-hidden mb-6 backdrop-blur-sm border border-neutral-200/30">
                <div
                  className={`h-full bg-gradient-to-r ${getProgressColor(overallConfidence)} rounded-full transition-all duration-700 ease-out shadow-glow-lg relative`}
                  style={{ width: `${overallConfidence}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                </div>
              </div>
              
              {/* Enhanced status message */}
              <div className="text-base text-neutral-700 space-y-2">
                {overallConfidence >= 80 ? (
                  <div className="p-4 bg-gradient-to-r from-accent-50 to-accent-100/50 rounded-xl border border-accent-200/50 animate-pulse-soft">
                    <div className="flex items-center justify-center space-x-3 text-accent-700 mb-2">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-bold text-lg">Ready to generate!</span>
                    </div>
                    <p className="text-sm text-accent-600">Your specification is comprehensive enough</p>
                  </div>
                ) : (
                  <div className="p-4 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 rounded-xl border border-primary-200/30">
                    <div className="space-y-2">
                      <p className="font-semibold">Target: 80% for generation</p>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                        <p className="text-sm text-primary-700">Keep chatting to improve confidence!</p>
                        <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced generation button */}
            {canGenerateSpec && (
              <Button size="lg" className="w-full group transform hover:scale-105 transition-all duration-300 shadow-elegant-xl">
                <Download className="w-5 h-5 mr-3" />
                Generate Specification
                <Sparkles className="w-5 h-5 ml-3 group-hover:animate-wiggle" />
              </Button>
            )}
          </div>
        </Card>

        {/* Enhanced Categories Progress */}
        <Card variant="floating" className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-elegant group-hover:shadow-glow-lg transition-all duration-300">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-800 text-lg group-hover:text-primary-700 transition-colors">Category Breakdown</h3>
              <p className="text-xs text-neutral-500">Detailed confidence analysis</p>
            </div>
          </div>
          
          <div className="space-y-5">
            {categories.map((category, index) => (
              <div key={category.key} className="group/category p-4 rounded-xl glass-morphism hover:shadow-elegant transition-all duration-300" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${getProgressColor(category.progress)} flex items-center justify-center shadow-elegant transition-all duration-300 group-hover/category:scale-110`}>
                      <category.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-neutral-800 group-hover/category:text-neutral-900 transition-colors mb-1">
                        {category.name}
                      </h4>
                      <p className="text-xs text-neutral-500 group-hover/category:text-neutral-600 transition-colors">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-base font-bold text-neutral-700">
                      {category.progress}%
                    </span>
                    {getProgressIcon(category.progress)}
                  </div>
                </div>
                
                {/* Enhanced progress bar */}
                <div className="w-full bg-neutral-200/60 rounded-full h-3 overflow-hidden confidence-indicator">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressColor(category.progress)} rounded-full transition-all duration-700 shadow-glow relative`}
                    style={{ 
                      width: `${category.progress}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                  </div>
                </div>
                
                {/* Progress status indicator */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      category.progress > 0 ? 'bg-primary-500' : 'bg-neutral-400'
                    }`} />
                    <span className="text-xs text-neutral-500 font-medium">
                      {category.progress >= 80 ? 'Complete' : category.progress >= 40 ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>
                  {category.progress > 0 && (
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-accent-500 rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 h-1 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

{/* Missing Areas Card */}
        {specificationContext?.missingAreas && specificationContext.missingAreas.length > 0 && (
          <Card variant="glass" className="border-l-4 border-l-orange-500">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-neutral-800">Areas Needing Attention</h3>
            </div>
            
            <div className="space-y-2 text-sm text-neutral-700">
              {specificationContext.missingAreas.map((area, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <p>{area}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                💡 <strong>Tip:</strong> Discuss these areas to improve your specification confidence!
              </p>
            </div>
          </Card>
        )}

        {/* Domain Context Card */}
        {specificationContext?.domainSpecificTerms && specificationContext.domainSpecificTerms.length > 0 && (
          <Card variant="glass">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-neutral-800">Project Context</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-neutral-600">Detected domain expertise:</p>
              <div className="flex flex-wrap gap-2">
                {specificationContext.domainSpecificTerms.slice(0, 6).map((term, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {term}
                  </span>
                ))}
                {specificationContext.domainSpecificTerms.length > 6 && (
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                    +{specificationContext.domainSpecificTerms.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Analysis Info */}
        {specificationContext?.lastAnalyzed && (
          <div className="text-xs text-neutral-500 text-center">
            Last analysis: {new Date(specificationContext.lastAnalyzed).toLocaleTimeString()}
          </div>
        )}

        {/* Tips Card */}
        <Card variant="glass">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-neutral-800">AI Tips</h3>
          </div>
          
          <div className="space-y-3 text-sm text-neutral-600">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <p>Be specific about your users and their problems</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <p>Mention any technical preferences or constraints</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <p>Ask questions if you're unsure about anything</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
              <p>The AI will guide you through missing areas</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};