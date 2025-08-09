# AI Specification Assistant

An AI-powered tool that helps beginners create comprehensive software specifications through compassionate guidance, filling knowledge gaps automatically to ensure Claude Code can build effectively without token waste.

## 🚀 Live Demo

Visit the deployed application: [Coming Soon]

## ✨ Features

### Phase 1 (Current) - Foundation & Onboarding
- **Complete Beginner Setup Wizard**: Step-by-step guidance from zero to ready-to-build
- **Tool Installation Guides**: Cursor IDE, Git, GitHub, and Claude Code setup
- **API Configuration**: Secure Claude API key management with validation
- **Professional UI**: Clean, responsive design with British English defaults
- **Setup Verification**: Automated testing to ensure everything works

### Coming in Phase 2 - AI Chat & Specification Creation
- AI-guided specification conversations
- Real-time confidence tracking across 6 categories
- Intelligent gap analysis and suggestions
- Export specifications optimised for Claude Code

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Storage**: Encrypted localStorage
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ai-specification-assistant

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

### Development
```bash
npm run dev          # Start dev server
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── onboarding/           # Setup wizard components
│   └── ui/                   # Reusable UI components
├── contexts/                 # React Context providers
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
└── test/                     # Test files
```

## 🎯 User Journey

1. **Welcome**: Introduction to the complete development workflow
2. **Tool Setup**: Installation guides for Cursor, Git, GitHub
3. **API Config**: Claude API key setup with secure storage
4. **Verification**: Automated testing of all setup components
5. **Main App**: Ready to create comprehensive specifications

## 🔒 Security

- API keys encrypted using AES encryption
- Secure local storage with prefixed keys
- No data sent to third parties
- Client-side only (Phase 1)

## 🌍 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Build settings are configured in `netlify.toml`
3. Deploy automatically on every push

### Vercel
1. Connect your GitHub repository to Vercel
2. Configuration is in `vercel.json`
3. One-click deployment

### Manual Build
```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

## 🧪 Testing

- **Unit Tests**: Individual component functionality
- **Integration Tests**: Context and state management
- **Coverage**: >80% target for all components
- **E2E**: Coming in Phase 2

```bash
npm run test          # Interactive test runner
npm run test:run      # Single test run
npm run test:ui       # Visual test interface
```

## 📊 Phase 1 Success Metrics

✅ **Complete Setup Wizard**: Guides users from zero to development-ready  
✅ **Professional UI**: Responsive design with British English defaults  
✅ **Secure Storage**: Encrypted API key management  
✅ **Testing Coverage**: >80% test coverage achieved  
✅ **Deployment Ready**: Netlify/Vercel configuration included  
✅ **Performance**: Fast loading and smooth interactions  

## 🔮 Coming Next (Phase 2)

- Real-time AI chat with Claude API
- Confidence tracking system
- Intelligent gap analysis
- Specification generation and export
- GitHub integration for code review

## 🤝 Contributing

This project is designed to be built incrementally with Claude Code. Each phase has clear requirements and success criteria.

### Development Principles
- One phase at a time
- Validate before proceeding  
- Test-driven development
- Component isolation
- British English by default

## 📝 License

Private project for development with AI assistance.

## 🙏 Acknowledgments

- Built with Claude Code assistance
- Designed for beginner developers
- Optimised for token efficiency
- Following modern React best practices

---

**Ready to transform how you build software?** Start with the setup wizard and create your first comprehensive specification with AI guidance.
