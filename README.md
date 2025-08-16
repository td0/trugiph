# TruGiph

A modern, responsive GIPHY gallery and search application built with React, TypeScript, and Material UI. This project demonstrates clean architecture, comprehensive testing, and modern web development practices.

## 🎯 GIPHY API Integration

This application leverages the **GIPHY API v1** to provide a rich GIF browsing and search experience. The integration uses two primary endpoints to deliver comprehensive GIF content:

### 📊 **Trending Endpoint** (`/v1/gifs/trending`)
- **Purpose**: Fetches currently popular and trending GIFs
- **Implementation**: Powers the home page with dynamic trending content
- **Features**: 
  - Real-time trending data updated by GIPHY
  - Configurable result limits (default: 25 GIFs per request)
  - Pagination support for infinite scrolling
  - Rating filters (G, PG, PG-13, R)

### 🔍 **Search Endpoint** (`/v1/gifs/search`)
- **Purpose**: Enables users to search GIFs by keywords and phrases
- **Implementation**: Powers the search functionality with URL-integrated queries
- **Features**:
  - Full-text search across GIPHY's extensive database
  - Infinite scroll pagination with offset-based loading
  - Query parameter encoding for special characters
  - Relevance-based result ranking
  - Search suggestions and autocomplete support

### 🔧 **API Configuration**
```typescript
// API Rate Limits (Free Tier)
- Requests per hour: 1,000
- Requests per day: 42,000
- Concurrent requests: 10

// Response Format
interface GiphyResponse {
  data: GiphyGif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}
```

### 🛡️ **Security & Best Practices**
- **API Key Management**: Secure environment variable storage
- **Rate Limiting**: Built-in request throttling and error handling
- **Data Transformation**: Clean separation between API data and UI models
- **Caching Strategy**: TanStack Query provides intelligent caching and background updates
- **Error Handling**: Graceful degradation with user-friendly error messages

## 🚀 Features

### Core Functionality
- **GIPHY Integration**: Search and browse trending GIFs using the GIPHY API
- **Responsive Design**: Adaptive masonry layout (4 columns on desktop, down to 1 on mobile)
- **Infinite Scrolling**: Seamless pagination for search results
- **Animation Toggle**: Switch between animated and static GIF previews
- **Copy to Clipboard**: One-click GIF URL copying with user feedback
- **Dark/Light Mode**: Theme switching with system preference detection

### User Experience
- **Smart Search**: URL-integrated search with navigation
- **Mobile-First**: Floating Action Button for mobile search
- **Responsive App Bar**: Collapsible navigation with search integration
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Graceful error states and user feedback

### Technical Excellence
- **Type Safety**: Full TypeScript implementation with strict typing
- **Modern React**: Hooks, context, and functional components
- **State Management**: Jotai for global state, TanStack Query for server state
- **Testing**: Comprehensive unit tests with Jest and React Testing Library
- **Performance**: Virtualized rendering for large lists
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript with strict configuration
- **Vite** - Fast build tool with HMR

### UI & Styling
- **Material UI v7** - Comprehensive React component library
- **Emotion** - CSS-in-JS styling solution
- **Responsive Design** - Mobile-first approach

### State Management
- **TanStack Query** - Server state management with caching
- **Jotai** - Atomic state management for global state
- **TanStack Router** - Type-safe routing with URL state

### Development & Testing
- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code linting with TypeScript rules
- **TypeScript ESLint** - TypeScript-specific linting

### API & Data
- **GIPHY API** - GIF search and trending data
- **Virtualization** - TanStack Virtual for performance

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **GIPHY API Key** - Get one from [GIPHY Developers](https://developers.giphy.com/)

## 🚀 Getting Started

### 1. Clone and Install
```bash
git clone <repository-url>
cd trugiph
pnpm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_GIPHY_API_KEY=your_giphy_api_key_here
```

### 3. Development Server
```bash
pnpm dev
```
Visit `http://localhost:5173` to see the application.

### 4. Build for Production
```bash
pnpm build
pnpm preview
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
pnpm test

# Watch mode for development
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Test Coverage
The project maintains comprehensive test coverage including:
- **Component Tests**: UI behavior and user interactions
- **Utility Tests**: Data transformation and helper functions
- **Integration Tests**: Router and API integration
- **Accessibility Tests**: ARIA compliance and keyboard navigation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── __tests__/      # Component tests
│   ├── SearchInput.tsx # Search functionality
│   ├── ImageWithSkeleton.tsx # GIF display component
│   └── VirtualizedMasonryGrid.tsx # Grid layout
├── hooks/              # Custom React hooks
│   └── useGiphy.ts     # GIPHY API integration
├── routes/             # TanStack Router pages
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page (trending)
│   └── search/         # Search pages
├── services/           # API services
│   └── giphyApi.ts     # GIPHY API client
├── stores/             # Global state management
│   └── animationStore.ts # Animation toggle state
├── types/              # TypeScript type definitions
│   └── giphy.ts        # GIPHY API types
├── utils/              # Utility functions
│   ├── clipboardUtils.ts # Clipboard operations
│   └── giphyTransform.ts # Data transformation
├── config/             # Configuration files
│   └── env.ts          # Environment variables
└── test/               # Test configuration
    ├── setup.ts        # Jest setup
    ├── jest-dom.d.ts   # Type declarations
    └── __mocks__/      # Mock implementations
```

## 🎨 Design System

### Responsive Breakpoints
- **Mobile**: < 600px (1 column)
- **Tablet**: 600px - 960px (2-3 columns)
- **Desktop**: > 960px (4 columns)

### Theme Configuration
- **Light Mode**: Clean, minimal design
- **Dark Mode**: Dark backgrounds with high contrast
- **System Preference**: Automatic theme detection

### Typography
- **Primary Font**: Roboto (Material UI default)
- **Logo Font**: Space Mono (italic, monospace)

## 🔧 Configuration

### Environment Variables
```env
VITE_GIPHY_API_KEY=your_api_key    # Required: GIPHY API key
```

### Build Configuration
- **Vite**: Modern build tool with TypeScript support
- **TanStack Router**: File-based routing with type generation
- **Path Aliases**: `@/` mapped to `src/` directory

### Testing Configuration
- **Jest**: Unit testing with TypeScript support
- **jsdom**: Browser environment simulation
- **Mock Strategy**: Comprehensive mocking for external dependencies

## 🚀 Deployment

### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. The deployment workflow runs on every push to the `main` branch.

#### **Setup Steps:**

1. **Repository Settings**
   ```bash
   # Navigate to your GitHub repository
   # Go to Settings > Pages
   # Source: Deploy from a branch
   # Branch: gh-pages / (root)
   ```

2. **Environment Secrets**
   ```bash
   # Go to Settings > Secrets and variables > Actions
   # Add repository secret:
   VITE_GIPHY_API_KEY=your_giphy_api_key_here
   ```

3. **Automatic Deployment**
   - Push to `main` branch triggers the workflow
   - Tests run automatically before deployment
   - Build artifacts are deployed to `gh-pages` branch
   - Site becomes available at: `https://yourusername.github.io/trugiph/`

#### **Manual Deployment**
```bash
# Build for production
pnpm build

# Preview build locally
pnpm preview

# Deploy manually (if needed)
# The GitHub Actions workflow handles this automatically
```

### Build Optimization
- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Route-based lazy loading
- **Asset Optimization**: Image and bundle optimization
- **Base Path**: Configured for GitHub Pages subdirectory deployment

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and tests
4. Submit pull request with description

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Enforced code style
- **Testing**: Required for new features
- **Documentation**: Update README for significant changes

### Commit Convention
Follow conventional commits for clear history:
```
feat: add new search functionality
fix: resolve mobile layout issue
docs: update API documentation
test: add component test coverage
```

## 📝 API Documentation

### GIPHY API Integration
The application uses the GIPHY API v1 with the following endpoints:
- **Search**: `/v1/gifs/search` - Search GIFs by query
- **Trending**: `/v1/gifs/trending` - Get trending GIFs
- **Rate Limits**: 1000 requests per hour (free tier)

### Data Transformation
GIFs are transformed from GIPHY format to internal `MasonryItem` interface:
```typescript
interface MasonryItem {
  id: string;
  imageUrl: string;        // Animated GIF URL
  staticImageUrl: string;  // Static preview URL
  width: number;
  height: number;
  title?: string;
}
```

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure Node.js version compatibility (v18+)
- Clear `node_modules` and reinstall dependencies
- Check TypeScript configuration

**API Issues**
- Verify GIPHY API key is valid
- Check network connectivity
- Review rate limiting

**Test Failures**
- Run tests in isolation to identify issues
- Check mock implementations
- Verify test environment setup

## 📄 License

This project is created for educational and portfolio purposes. Please respect GIPHY's terms of service when using their API.

## 🙏 Acknowledgments

- **GIPHY** - For providing the GIF API
- **Material UI** - For the comprehensive component library
- **TanStack** - For excellent data fetching and routing solutions
- **React Team** - For the amazing framework
