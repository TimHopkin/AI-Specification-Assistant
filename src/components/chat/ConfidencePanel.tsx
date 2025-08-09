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
    <div className="h-full overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Overall Progress Card */}
        <Card variant="gradient" className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-elegant">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 text-lg">Overall Progress</h3>
                <p className="text-sm text-neutral-600">Specification confidence</p>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl font-bold gradient-text mb-2">{overallConfidence}%</div>
              <div className="w-full h-3 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full bg-gradient-to-r ${getProgressColor(overallConfidence)} rounded-full transition-all duration-700 ease-out shadow-glow`}
                  style={{ width: `${overallConfidence}%` }}
                />
              </div>
              
              <div className="text-sm text-neutral-600 space-y-1">
                {overallConfidence >= 80 ? (
                  <div className="flex items-center justify-center space-x-2 text-accent-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">Ready to generate!</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p>Target: 80% for specification generation</p>
                    <p className="text-xs text-primary-600">Keep chatting to improve confidence!</p>
                  </div>
                )}
              </div>
            </div>
            
            {canGenerateSpec && (
              <Button size="sm" className="w-full group">
                <Download className="w-4 h-4 mr-2" />
                Generate Specification
                <Sparkles className="w-4 h-4 ml-2 group-hover:animate-bounce-gentle" />
              </Button>
            )}
          </div>
        </Card>

        {/* Categories Progress */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-neutral-800">Category Breakdown</h3>
          </div>
          
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.key} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${getProgressColor(category.progress)} flex items-center justify-center transition-all duration-200`}>
                      <category.icon className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-800 group-hover:text-neutral-900 transition-colors">
                        {category.name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-neutral-700">
                      {category.progress}%
                    </span>
                    {getProgressIcon(category.progress)}
                  </div>
                </div>
                
                <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressColor(category.progress)} rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${category.progress}%` }}
                  />
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