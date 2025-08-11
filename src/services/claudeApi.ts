import { useApp } from '../contexts/AppContext';

export interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SpecificationContext {
  projectType?: string;
  targetUsers?: string;
  mainProblem?: string;
  keyFeatures?: string[];
  technicalRequirements?: string[];
  constraints?: string[];
  businessGoals?: string[];
  userFlows?: string[];
  dataRequirements?: string[];
  securityNeeds?: string[];
  performanceNeeds?: string[];
  integrations?: string[];
  
  // Quality metrics for each field
  qualityScores?: {
    projectTypeClarity?: number; // 0-100: How well-defined is the project type
    userDefinitionDepth?: number; // 0-100: How detailed are user personas/needs
    problemDefinitionDepth?: number; // 0-100: How clearly is the problem articulated
    featureSpecificity?: number; // 0-100: How specific and detailed are features
    technicalSpecificity?: number; // 0-100: How detailed are technical requirements
    dataModelClarity?: number; // 0-100: How well-defined are data needs
    securityConsiderations?: number; // 0-100: How thoroughly security is addressed
    performanceConsiderations?: number; // 0-100: How well performance needs are defined
    integrationClarity?: number; // 0-100: How clearly integrations are specified
  };
  
  // Conversation metadata
  conversationDepth?: number; // Total meaningful exchanges
  domainSpecificTerms?: string[]; // Industry/domain-specific terms identified
  missingAreas?: string[]; // Areas that need more information
  lastAnalyzed?: Date; // When this context was last analyzed
}

export interface ConfidenceMetrics {
  technicalArchitecture: number;
  userExperience: number;
  businessLogic: number;
  developmentEnvironment: number;
  securityCompliance: number;
  performanceScaling: number;
}

const SYSTEM_PROMPT = `You are an experienced software architect and compassionate mentor helping beginners create comprehensive software specifications. Your role is to:

## Core Responsibilities:
1. **Guide through conversation**: Ask thoughtful follow-up questions to understand the user's vision
2. **Fill knowledge gaps**: Identify missing requirements and guide users to think through them
3. **Build specifications progressively**: Each conversation should move toward a complete specification
4. **Be beginner-friendly**: Explain technical concepts clearly without being condescending
5. **Stay focused**: Keep conversations moving toward specification completion

## Personality Traits:
- Compassionate senior developer who remembers being a beginner
- Patient but focused on getting to complete requirements
- Explains "why" behind technical decisions
- Proactively identifies common pitfalls beginners miss
- Celebrates progress and encourages continued engagement

## Question Strategy:
- Ask 2-4 focused questions per response (not overwhelming)
- Build on previous answers rather than jumping topics
- Guide toward concrete, actionable requirements
- Help users think through implications of their choices
- Identify gaps in: security, scalability, user experience, data management

## Response Format:
- Start with validation/encouragement of their input
- Ask strategic follow-up questions
- Provide gentle guidance on technical considerations
- End with clear next steps
- Keep responses conversational but purposeful

## Current Conversation Context:
You are helping create a comprehensive software specification. Focus on gathering:
- Business requirements (what problem, who are users, success metrics)
- Technical requirements (platform, data, integrations, scale)
- User experience requirements (key workflows, accessibility, mobile/web)
- Security and compliance needs
- Performance and scaling expectations
- Development and deployment preferences

Remember: Your goal is to create a specification so complete that Claude Code can build the software without additional clarification.`;

export class ClaudeApiService {
  private apiKey: string;
  private apiUrl = 'https://api.anthropic.com/v1/messages'; // Direct API endpoint
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(
    messages: ApiMessage[], 
    specificationContext: SpecificationContext
  ): Promise<{ response: string; updatedContext: SpecificationContext; confidence: ConfidenceMetrics }> {
    console.log('🔍 Claude API Debug - Starting API call...');
    console.log('📝 Messages to send:', messages.length);
    console.log('🔑 API Key available:', !!this.apiKey);
    console.log('🔑 API Key length:', this.apiKey?.length || 0);
    console.log('📍 API URL:', this.apiUrl);

    try {
      // Build enhanced system prompt with current context
      const contextPrompt = this.buildContextPrompt(specificationContext);
      
      const requestBody = {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        temperature: 0.7,
        system: `${SYSTEM_PROMPT}\n\n${contextPrompt}`,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      };

      console.log('📨 Request body prepared:', {
        model: requestBody.model,
        messageCount: requestBody.messages.length,
        systemPromptLength: requestBody.system.length,
        maxTokens: requestBody.max_tokens
      });

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 API Response status:', response.status);
      console.log('📡 API Response ok:', response.ok);
      console.log('📡 API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error Data:', errorData);
        throw new Error(`Claude API error: ${response.status} ${response.statusText}. ${errorData.error?.message || JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('✅ API Success - Response data structure:', {
        hasContent: !!data.content,
        contentLength: data.content?.length || 0,
        contentType: data.content?.[0]?.type,
        hasText: !!data.content?.[0]?.text
      });

      const aiResponse = data.content[0]?.text || 'I apologize, but I encountered an issue generating a response. Please try again.';
      console.log('💬 AI Response length:', aiResponse.length);

      // Extract information from the conversation to update context
      const updatedContext = await this.extractContextFromConversation(
        [...messages, { role: 'assistant', content: aiResponse }],
        specificationContext
      );

      // Calculate confidence metrics based on current context
      const confidence = this.calculateConfidenceMetrics(updatedContext);

      console.log('🎯 Confidence updated:', confidence);
      console.log('🔍 Context updated:', Object.keys(updatedContext));

      return {
        response: aiResponse,
        updatedContext,
        confidence
      };

    } catch (error) {
      console.error('💥 Claude API error details:', error);
      console.error('💥 Error name:', error instanceof Error ? error.name : 'Unknown');
      console.error('💥 Error message:', error instanceof Error ? error.message : 'Unknown error');
      console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack');
      
      // Return a helpful error message that doesn't break the UX
      const fallbackResponse = this.generateFallbackResponse(error, messages);
      
      return {
        response: fallbackResponse,
        updatedContext: specificationContext,
        confidence: this.calculateConfidenceMetrics(specificationContext)
      };
    }
  }

  private buildContextPrompt(context: SpecificationContext): string {
    const contextParts = [];
    
    if (context.projectType) {
      contextParts.push(`Project Type: ${context.projectType}`);
    }
    
    if (context.targetUsers) {
      contextParts.push(`Target Users: ${context.targetUsers}`);
    }
    
    if (context.mainProblem) {
      contextParts.push(`Main Problem Being Solved: ${context.mainProblem}`);
    }
    
    if (context.keyFeatures && context.keyFeatures.length > 0) {
      contextParts.push(`Key Features Identified: ${context.keyFeatures.join(', ')}`);
    }
    
    if (context.technicalRequirements && context.technicalRequirements.length > 0) {
      contextParts.push(`Technical Requirements: ${context.technicalRequirements.join(', ')}`);
    }

    if (context.constraints && context.constraints.length > 0) {
      contextParts.push(`Constraints: ${context.constraints.join(', ')}`);
    }

    if (contextParts.length === 0) {
      return "## Current Context: Just starting the specification process.";
    }

    return `## Current Context:\n${contextParts.map(part => `- ${part}`).join('\n')}`;
  }

  private async extractContextFromConversation(
    messages: ApiMessage[], 
    currentContext: SpecificationContext
  ): Promise<SpecificationContext> {
    try {
      // Use Claude to intelligently extract context from conversation
      const extractionResult = await this.performIntelligentExtraction(messages, currentContext);
      return extractionResult;
    } catch (error) {
      console.error('Context extraction failed, falling back to simple extraction:', error);
      // Fallback to simple extraction if API fails
      return this.fallbackContextExtraction(messages, currentContext);
    }
  }

  private async performIntelligentExtraction(
    messages: ApiMessage[], 
    currentContext: SpecificationContext
  ): Promise<SpecificationContext> {
    const conversationHistory = messages.slice(-6).map(msg => 
      `${msg.role}: ${msg.content}`
    ).join('\n\n');

    const extractionPrompt = `
Analyze this conversation about a software project and extract structured information. Return a JSON object with the following structure:

{
  "projectType": "specific project type (e.g., 'E-commerce Website', 'Farm Management Platform', 'Educational Course Platform')",
  "targetUsers": "detailed description of who will use this",
  "mainProblem": "clear statement of the problem being solved",
  "keyFeatures": ["array of specific features mentioned"],
  "technicalRequirements": ["specific technologies, platforms, or technical needs mentioned"],
  "dataRequirements": ["types of data to be stored/processed"],
  "securityNeeds": ["security requirements or concerns mentioned"],
  "performanceNeeds": ["performance or scaling requirements"],
  "integrations": ["third-party services or systems to integrate with"],
  "businessGoals": ["business objectives or success metrics"],
  "userFlows": ["key user workflows or journeys described"],
  "constraints": ["limitations, budget, timeline, or other constraints"],
  "domainSpecificTerms": ["industry-specific terms or concepts mentioned"],
  "qualityScores": {
    "projectTypeClarity": 0-100,
    "userDefinitionDepth": 0-100,
    "problemDefinitionDepth": 0-100,
    "featureSpecificity": 0-100,
    "technicalSpecificity": 0-100,
    "dataModelClarity": 0-100,
    "securityConsiderations": 0-100,
    "performanceConsiderations": 0-100,
    "integrationClarity": 0-100
  },
  "missingAreas": ["list of important areas that need more information"]
}

Only include information that is explicitly mentioned or can be reasonably inferred. Use quality scores to indicate how well-defined each area is based on the conversation depth.

Conversation:
${conversationHistory}

Current Context:
${JSON.stringify(currentContext, null, 2)}`;

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        temperature: 0.3,
        messages: [{ role: 'user', content: extractionPrompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Extraction API call failed: ${response.status}`);
    }

    const data = await response.json();
    const extractedData = JSON.parse(data.content[0]?.text || '{}');

    // Merge with current context, preserving existing data
    const newContext: SpecificationContext = {
      ...currentContext,
      ...extractedData,
      keyFeatures: [...(currentContext.keyFeatures || []), ...(extractedData.keyFeatures || [])].filter((v, i, a) => a.indexOf(v) === i),
      technicalRequirements: [...(currentContext.technicalRequirements || []), ...(extractedData.technicalRequirements || [])].filter((v, i, a) => a.indexOf(v) === i),
      dataRequirements: [...(currentContext.dataRequirements || []), ...(extractedData.dataRequirements || [])].filter((v, i, a) => a.indexOf(v) === i),
      securityNeeds: [...(currentContext.securityNeeds || []), ...(extractedData.securityNeeds || [])].filter((v, i, a) => a.indexOf(v) === i),
      performanceNeeds: [...(currentContext.performanceNeeds || []), ...(extractedData.performanceNeeds || [])].filter((v, i, a) => a.indexOf(v) === i),
      integrations: [...(currentContext.integrations || []), ...(extractedData.integrations || [])].filter((v, i, a) => a.indexOf(v) === i),
      businessGoals: [...(currentContext.businessGoals || []), ...(extractedData.businessGoals || [])].filter((v, i, a) => a.indexOf(v) === i),
      userFlows: [...(currentContext.userFlows || []), ...(extractedData.userFlows || [])].filter((v, i, a) => a.indexOf(v) === i),
      constraints: [...(currentContext.constraints || []), ...(extractedData.constraints || [])].filter((v, i, a) => a.indexOf(v) === i),
      domainSpecificTerms: [...(currentContext.domainSpecificTerms || []), ...(extractedData.domainSpecificTerms || [])].filter((v, i, a) => a.indexOf(v) === i),
      qualityScores: {
        ...currentContext.qualityScores,
        ...extractedData.qualityScores
      },
      missingAreas: extractedData.missingAreas || [],
      conversationDepth: messages.length,
      lastAnalyzed: new Date()
    };

    console.log('🧠 Intelligent context extraction completed:', {
      extractedFields: Object.keys(extractedData).length,
      qualityScores: extractedData.qualityScores,
      missingAreas: extractedData.missingAreas?.length || 0
    });

    return newContext;
  }

  private fallbackContextExtraction(
    messages: ApiMessage[], 
    currentContext: SpecificationContext
  ): SpecificationContext {
    // Enhanced fallback with domain-specific keywords
    const allContent = messages.map(m => m.content.toLowerCase()).join(' ');
    const newContext = { ...currentContext };

    // Enhanced project type detection
    if (!newContext.projectType) {
      if (allContent.includes('farm') || allContent.includes('agriculture') || allContent.includes('regenerative')) {
        newContext.projectType = 'Agricultural/Farm Website';
      } else if (allContent.includes('e-commerce') || allContent.includes('shop') || allContent.includes('store')) {
        newContext.projectType = 'E-commerce Platform';
      } else if (allContent.includes('course') || allContent.includes('education') || allContent.includes('learning')) {
        newContext.projectType = 'Educational Platform';
      } else if (allContent.includes('web app') || allContent.includes('website')) {
        newContext.projectType = 'Web Application';
      } else if (allContent.includes('mobile app') || allContent.includes('ios') || allContent.includes('android')) {
        newContext.projectType = 'Mobile Application';
      }
    }

    // Enhanced feature extraction with domain-specific terms
    const enhancedFeatureKeywords = [
      'user accounts', 'authentication', 'login', 'register', 'signup',
      'payments', 'checkout', 'billing', 'subscriptions',
      'real-time', 'live updates', 'notifications', 'chat', 'messaging',
      'search', 'filtering', 'dashboard', 'analytics', 'reports',
      'upload', 'file sharing', 'photos', 'images', 'media',
      'calendar', 'scheduling', 'booking', 'appointments',
      'social', 'sharing', 'comments', 'likes', 'reviews',
      // Farm/agriculture specific
      'iot sensors', 'weather data', 'soil monitoring', 'crop tracking',
      'livestock management', 'irrigation', 'harvest tracking',
      // Education specific
      'course management', 'video content', 'progress tracking', 'certificates',
      'discussion forums', 'assignments', 'quizzes'
    ];

    newContext.keyFeatures = newContext.keyFeatures || [];
    enhancedFeatureKeywords.forEach(keyword => {
      if (allContent.includes(keyword) && !newContext.keyFeatures!.includes(keyword)) {
        newContext.keyFeatures!.push(keyword);
      }
    });

    return newContext;
  }

  private calculateConfidenceMetrics(context: SpecificationContext): ConfidenceMetrics {
    const qualityScores = context.qualityScores || {};
    
    // If we have quality scores from intelligent extraction, use them
    if (Object.keys(qualityScores).length > 0) {
      return {
        technicalArchitecture: this.calculateTechnicalArchitectureScore(context, qualityScores),
        userExperience: this.calculateUserExperienceScore(context, qualityScores),
        businessLogic: this.calculateBusinessLogicScore(context, qualityScores),
        developmentEnvironment: 100, // Always 100 since setup was completed
        securityCompliance: this.calculateSecurityScore(context, qualityScores),
        performanceScaling: this.calculatePerformanceScore(context, qualityScores),
      };
    }

    // Fallback to simpler calculation for cases where intelligent extraction failed
    return this.calculateFallbackConfidenceMetrics(context);
  }

  private calculateBusinessLogicScore(context: SpecificationContext, qualityScores: any): number {
    let score = 0;
    
    // Weight quality scores
    if (qualityScores.projectTypeClarity) score += qualityScores.projectTypeClarity * 0.3;
    if (qualityScores.problemDefinitionDepth) score += qualityScores.problemDefinitionDepth * 0.3;
    if (qualityScores.userDefinitionDepth) score += qualityScores.userDefinitionDepth * 0.25;
    if (qualityScores.featureSpecificity) score += qualityScores.featureSpecificity * 0.15;
    
    // Bonus for business goals and constraints
    if (context.businessGoals && context.businessGoals.length > 0) score += 10;
    if (context.constraints && context.constraints.length > 0) score += 5;
    
    return Math.min(Math.round(score), 100);
  }

  private calculateTechnicalArchitectureScore(context: SpecificationContext, qualityScores: any): number {
    let score = 0;
    
    // Weight quality scores
    if (qualityScores.technicalSpecificity) score += qualityScores.technicalSpecificity * 0.4;
    if (qualityScores.dataModelClarity) score += qualityScores.dataModelClarity * 0.3;
    if (qualityScores.integrationClarity) score += qualityScores.integrationClarity * 0.2;
    if (qualityScores.projectTypeClarity) score += qualityScores.projectTypeClarity * 0.1;
    
    // Bonus for comprehensive technical requirements
    if (context.technicalRequirements && context.technicalRequirements.length > 3) score += 10;
    if (context.dataRequirements && context.dataRequirements.length > 0) score += 10;
    if (context.integrations && context.integrations.length > 0) score += 10;
    
    return Math.min(Math.round(score), 100);
  }

  private calculateUserExperienceScore(context: SpecificationContext, qualityScores: any): number {
    let score = 0;
    
    // Weight quality scores
    if (qualityScores.userDefinitionDepth) score += qualityScores.userDefinitionDepth * 0.4;
    if (qualityScores.featureSpecificity) score += qualityScores.featureSpecificity * 0.3;
    if (qualityScores.problemDefinitionDepth) score += qualityScores.problemDefinitionDepth * 0.2;
    if (qualityScores.projectTypeClarity) score += qualityScores.projectTypeClarity * 0.1;
    
    // Bonus for user flows and comprehensive features
    if (context.userFlows && context.userFlows.length > 0) score += 15;
    if (context.keyFeatures && context.keyFeatures.length > 3) score += 10;
    
    return Math.min(Math.round(score), 100);
  }

  private calculateSecurityScore(context: SpecificationContext, qualityScores: any): number {
    let score = 0;
    
    // Weight quality scores
    if (qualityScores.securityConsiderations) score += qualityScores.securityConsiderations * 0.7;
    
    // Bonus for explicit security needs
    if (context.securityNeeds && context.securityNeeds.length > 0) {
      score += Math.min(context.securityNeeds.length * 15, 30);
    }
    
    // Auto-add points if authentication features are mentioned
    if (context.keyFeatures?.some(f => f.toLowerCase().includes('auth') || f.toLowerCase().includes('login') || f.toLowerCase().includes('user accounts'))) {
      score += 20;
    }
    
    return Math.min(Math.round(score), 100);
  }

  private calculatePerformanceScore(context: SpecificationContext, qualityScores: any): number {
    let score = 0;
    
    // Weight quality scores
    if (qualityScores.performanceConsiderations) score += qualityScores.performanceConsiderations * 0.7;
    
    // Bonus for explicit performance needs
    if (context.performanceNeeds && context.performanceNeeds.length > 0) {
      score += Math.min(context.performanceNeeds.length * 20, 30);
    }
    
    // Basic performance considerations based on project complexity
    if (context.keyFeatures && context.keyFeatures.length > 5) score += 10;
    if (context.integrations && context.integrations.length > 2) score += 10;
    if (context.dataRequirements && context.dataRequirements.length > 2) score += 10;
    
    return Math.min(Math.round(score), 100);
  }

  private calculateFallbackConfidenceMetrics(context: SpecificationContext): ConfidenceMetrics {
    // Original simple calculation as fallback
    const base = {
      technicalArchitecture: 0,
      userExperience: 0,
      businessLogic: 0,
      developmentEnvironment: 100,
      securityCompliance: 0,
      performanceScaling: 0,
    };

    // Business Logic confidence
    let businessLogicPoints = 0;
    if (context.projectType) businessLogicPoints += 30;
    if (context.mainProblem) businessLogicPoints += 25;
    if (context.targetUsers) businessLogicPoints += 25;
    if (context.keyFeatures && context.keyFeatures.length > 0) {
      businessLogicPoints += Math.min(context.keyFeatures.length * 5, 20);
    }
    base.businessLogic = Math.min(businessLogicPoints, 100);

    // Technical Architecture confidence
    let techPoints = 0;
    if (context.projectType) techPoints += 20;
    if (context.technicalRequirements && context.technicalRequirements.length > 0) {
      techPoints += Math.min(context.technicalRequirements.length * 15, 60);
    }
    if (context.dataRequirements && context.dataRequirements.length > 0) {
      techPoints += 20;
    }
    base.technicalArchitecture = Math.min(techPoints, 100);

    // User Experience confidence
    let uxPoints = 0;
    if (context.targetUsers) uxPoints += 30;
    if (context.userFlows && context.userFlows.length > 0) {
      uxPoints += Math.min(context.userFlows.length * 20, 40);
    }
    if (context.keyFeatures && context.keyFeatures.length > 2) uxPoints += 30;
    base.userExperience = Math.min(uxPoints, 100);

    // Security confidence
    let securityPoints = 0;
    if (context.securityNeeds && context.securityNeeds.length > 0) {
      securityPoints += context.securityNeeds.length * 25;
    }
    if (context.keyFeatures?.some(f => f.includes('auth') || f.includes('login') || f.includes('user accounts'))) {
      securityPoints += 40;
    }
    base.securityCompliance = Math.min(securityPoints, 100);

    // Performance confidence
    let perfPoints = 0;
    if (context.performanceNeeds && context.performanceNeeds.length > 0) {
      perfPoints += context.performanceNeeds.length * 30;
    }
    if (context.projectType) perfPoints += 20;
    base.performanceScaling = Math.min(perfPoints, 100);

    return base;
  }

  private generateFallbackResponse(error: any, messages: ApiMessage[]): string {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
    
    if (error.message?.includes('rate limit') || error.message?.includes('429')) {
      return `I apologize, but I'm currently experiencing high demand. Please wait a moment before sending your next message. 

In the meantime, feel free to think about these aspects of your project:
• Who are your target users and what problems are you solving for them?
• What are the core features that would make your solution valuable?
• Are there any technical preferences or constraints I should know about?

I'll be ready to help you build a comprehensive specification once the rate limit resets.`;
    }
    
    if (error.message?.includes('invalid') || error.message?.includes('401')) {
      return `I'm having trouble connecting to my AI service. This might be an API key issue. 

While we work on that, I can help you think through your project:
• Try describing your project idea in more detail
• Think about your target users and their main problems
• Consider what success looks like for your project

Please try sending your message again in a moment, or contact support if this continues.`;
    }

    // Generic fallback that's still helpful
    return `I apologize, but I encountered a temporary issue. Let me try to help based on what you've shared:

${lastUserMessage.toLowerCase().includes('web') ? 
  `I can see you're interested in a web application. That's a great choice for reaching users across platforms. Let's think about: Who will use this? What's the main problem you're solving? What features are most important?` :
  lastUserMessage.toLowerCase().includes('mobile') ? 
  `A mobile application sounds exciting! Mobile apps offer great user engagement. Key questions: iOS, Android, or both? What's the core functionality? Will users need to work offline?` :
  `I can see you have a project in mind. To help you build a solid specification, I'd love to understand: What type of software are you envisioning? Who are your users? What problem does it solve?`
}

Please try sending your message again - I should be able to provide more detailed guidance.`;
  }

  // Test API key validity
  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Test' }]
        })
      });
      
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Hook for using Claude API in components
export const useClaudeApi = () => {
  const { state } = useApp();
  
  console.log('🔍 useClaudeApi Debug - App State Check:');
  console.log('📱 Full state:', state);
  console.log('🔧 API Configuration:', state.apiConfiguration);
  console.log('🔑 API Key available:', !!state.apiConfiguration?.anthropicApiKey);
  console.log('🔑 API Key length:', state.apiConfiguration?.anthropicApiKey?.length || 0);
  console.log('✅ API Valid flag:', state.apiConfiguration?.isValid);
  
  if (!state.apiConfiguration?.anthropicApiKey) {
    console.error('❌ No API key found in state!');
    throw new Error('No API key available. Please complete API configuration.');
  }
  
  console.log('✅ Creating Claude API service with key...');
  return new ClaudeApiService(state.apiConfiguration.anthropicApiKey);
};