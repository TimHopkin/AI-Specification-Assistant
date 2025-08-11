import React from 'react';
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


  return (
    <div className="h-full overflow-y-auto p-4 bg-white/80 backdrop-blur-xl">
      {/* Modern background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-indigo-50/30 pointer-events-none" />
      
      <div className="space-y-4 relative z-10">
        {/* Modern Overall Progress Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-5 shadow-lg shadow-gray-900/5 animate-fade-in-up">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 relative overflow-hidden">
                <Target className="w-6 h-6 text-white relative z-10" />
                {/* Animated shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
                {/* Activity indicator */}
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mb-1">Overall Progress</h3>
            <p className="text-sm text-gray-600 mb-4">AI specification confidence</p>
            
            {/* Modern progress display */}
            <div className="relative mb-4">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {overallConfidence}%
              </div>
              
              {/* Circular progress indicator */}
              <div className="relative w-16 h-16 mx-auto mb-4">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-gray-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 28}`,
                      strokeDashoffset: `${2 * Math.PI * 28 * (1 - overallConfidence / 100)}`
                    }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            {/* Status message */}
            {overallConfidence >= 80 ? (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/50 mb-4">
                <div className="flex items-center justify-center gap-2 text-emerald-700 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-semibold text-sm">Ready to generate!</span>
                </div>
                <p className="text-xs text-emerald-600">Specification is comprehensive enough</p>
              </div>
            ) : (
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200/50 mb-4">
                <p className="font-semibold text-sm text-indigo-700 mb-1">Target: 80% for generation</p>
                <p className="text-xs text-indigo-600">Continue chatting to improve confidence</p>
              </div>
            )}
            
            {/* Generation button */}
            {canGenerateSpec && (
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-2xl font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Generate Specification
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Modern Categories Progress */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-5 shadow-lg shadow-gray-900/5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Category Breakdown</h3>
              <p className="text-xs text-gray-600">Detailed confidence analysis</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div key={category.key} className="group p-3 rounded-2xl bg-gray-50/50 hover:bg-gray-100/50 transition-all duration-200" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-xl bg-gradient-to-r ${
                      category.progress >= 80 ? 'from-emerald-500 to-emerald-600' : 
                      category.progress >= 40 ? 'from-indigo-500 to-purple-500' : 
                      'from-gray-400 to-gray-500'
                    } flex items-center justify-center shadow-sm`}>
                      <category.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {category.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-700">
                      {category.progress}%
                    </span>
                    {category.progress >= 80 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : category.progress >= 40 ? (
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Modern progress bar */}
                <div className="w-full bg-gray-200/80 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      category.progress >= 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 progress-shimmer' : 
                      category.progress >= 40 ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 
                      category.progress > 0 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                      'bg-gray-300'
                    }`}
                    style={{ 
                      width: `${category.progress}%`,
                      transitionDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
                
                {/* Status indicator */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      category.progress >= 80 ? 'bg-emerald-500 animate-pulse' : 
                      category.progress >= 40 ? 'bg-indigo-500 animate-pulse' : 
                      category.progress > 0 ? 'bg-blue-400 animate-pulse' :
                      'bg-gray-400'
                    }`} />
                    <span className="text-xs text-gray-600 font-medium">
                      {category.progress >= 80 ? 'Complete' : 
                       category.progress >= 40 ? 'In Progress' : 
                       category.progress > 0 ? 'Started' : 'Not Started'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

{/* Modern Missing Areas Card */}
        {specificationContext?.missingAreas && specificationContext.missingAreas.length > 0 && (
          <div className="bg-white/90 backdrop-blur-xl border border-orange-200/50 border-l-4 border-l-orange-500 rounded-3xl p-4 shadow-lg shadow-gray-900/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-sm">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Areas Needing Attention</h3>
            </div>
            
            <div className="space-y-2 text-sm text-gray-700">
              {specificationContext.missingAreas.map((area, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-orange-50/80 rounded-xl">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-xs">{area}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-3 p-2 bg-indigo-50/80 rounded-xl">
              <p className="text-xs text-indigo-700">
                💡 <strong>Tip:</strong> Discuss these areas to improve specification confidence!
              </p>
            </div>
          </div>
        )}

        {/* Modern Domain Context Card */}
        {specificationContext?.domainSpecificTerms && specificationContext.domainSpecificTerms.length > 0 && (
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-4 shadow-lg shadow-gray-900/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Project Context</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Detected domain expertise:</p>
              <div className="flex flex-wrap gap-1.5">
                {specificationContext.domainSpecificTerms.slice(0, 6).map((term, index) => (
                  <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                    {term}
                  </span>
                ))}
                {specificationContext.domainSpecificTerms.length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    +{specificationContext.domainSpecificTerms.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Info */}
        {specificationContext?.lastAnalyzed && (
          <div className="text-xs text-gray-500 text-center">
            Last analysis: {new Date(specificationContext.lastAnalyzed).toLocaleTimeString()}
          </div>
        )}

        {/* Modern Tips Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-4 shadow-lg shadow-gray-900/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm">AI Tips</h3>
          </div>
          
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-xs">Be specific about your users and their problems</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-xs">Mention any technical preferences or constraints</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-xs">Ask questions if you're unsure about anything</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-xs">The AI will guide you through missing areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};