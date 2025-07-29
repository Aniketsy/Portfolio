# Backend Architecture Documentation

## Overview

This document describes the architecture of the backend system for the portfolio website. The backend provides APIs for various features including chat interaction, image classification, voice commands, project management, testimonials, and more.

## System Architecture

### High-Level Architecture Diagram

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  Client Side  │     │  Backend API  │     │    External   │
│  Application  │◄────►     Server    │◄────►    Services   │
└───────────────┘     └───────────────┘     └───────────────┘
                             │
                             ▼
                      ┌───────────────┐
                      │    Database   │
                      └───────────────┘
```

### Component Breakdown

1. **API Layer**
   - RESTful endpoints for all features
   - Authentication and authorization middleware
   - Request validation and error handling
   - Rate limiting and security features

2. **Service Layer**
   - Business logic implementation
   - External API integrations
   - Data processing and transformation

3. **Data Access Layer**
   - Database operations and queries
   - Data models and schemas
   - Caching mechanisms

4. **External Integrations**
   - AI/ML model services
   - File storage services
   - Email services
   - Analytics services

## Technology Stack

### Backend Framework
- **Node.js with Express.js**
  - Chosen for its lightweight nature and JavaScript compatibility with the frontend
  - Provides robust routing and middleware capabilities
  - Good performance for API-centric applications

### Database
- **MongoDB**
  - Document-based NoSQL database
  - Flexible schema for evolving data structures
  - Good performance for read-heavy operations
  - Native JSON support

### Authentication
- **JWT (JSON Web Tokens)**
  - Stateless authentication mechanism
  - Secure transmission of user information
  - Built-in expiration handling

### File Storage
- **AWS S3**
  - Scalable object storage for project images and user uploads
  - High availability and durability
  - CDN integration capabilities

### AI/ML Services
- **Hugging Face Inference API**
  - Pre-trained models for NLP and image classification
  - Easy integration and deployment
  - Cost-effective for moderate usage levels

### Real-time Features
- **Socket.IO**
  - Real-time bidirectional communication
  - Used for chat interface updates
  - Fallback to long polling when WebSockets unavailable

## Directory Structure

```
/backend
├── /src
│   ├── /api             # API route definitions
│   │   ├── /v1          # API version 1
│   │   │   ├── /auth    # Authentication routes
│   │   │   ├── /projects
│   │   │   ├── /chat
│   │   │   ├── /classify
│   │   │   ├── /voice
│   │   │   ├── /testimonials
│   │   │   ├── /contact
│   │   │   └── /skills
│   ├── /config          # Configuration files
│   ├── /controllers     # Route controllers
│   ├── /middleware      # Custom middleware
│   ├── /models          # Database models
│   ├── /services        # Business logic services
│   │   ├── /ai          # AI/ML service integrations
│   │   ├── /storage     # File storage service
│   │   ├── /email       # Email service
│   │   └── /analytics   # Analytics service
│   ├── /utils           # Utility functions
│   └── /types           # TypeScript type definitions
├── /tests               # Test files
├── /docs                # Documentation
├── .env.example         # Example environment variables
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project overview
```

## Data Models

### User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Hashed
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}
```

### Project Model
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // URL to image
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Testimonial Model
```typescript
interface Testimonial {
  id: string;
  name: string;
  email: string;
  position: string;
  content: string;
  rating: number; // 1-5
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Contact Model
```typescript
interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}
```

### Chat Session Model
```typescript
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  messages: ChatMessage[];
  visitorId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Skill Category Model
```typescript
interface Skill {
  id: string;
  name: string;
  proficiency: number; // 0-100
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Authentication Flow

1. **Registration**
   - Admin-only registration with secure credentials
   - Email verification process
   - Password hashing with bcrypt

2. **Login**
   - Credential validation
   - JWT token generation
   - Token expiration handling

3. **Authentication Middleware**
   - Token validation on protected routes
   - Role-based access control
   - Rate limiting for security

## API Integration Points

### Chat Interface Integration
```typescript
// Client-side request
const response = await fetch('/api/v1/chat/response', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message, sessionId })
});

// Backend integration with AI service
async function getChatResponse(message: string, sessionId?: string) {
  // Call to Hugging Face or OpenAI API
  const aiResponse = await aiService.getCompletion(message);
  // Store in database
  await chatRepository.saveMessage(sessionId, message, aiResponse);
  return { response: aiResponse, sessionId };
}
```

### Image Classification Integration
```typescript
// Client-side request
const formData = new FormData();
formData.append('image', imageFile);
const response = await fetch('/api/v1/classify/image', {
  method: 'POST',
  body: formData
});

// Backend integration with ML service
async function classifyImage(imageBuffer: Buffer) {
  // Upload to storage
  const imageUrl = await storageService.uploadImage(imageBuffer);
  // Get classification from ML model
  const predictions = await mlService.classifyImage(imageUrl);
  return { predictions, imageUrl };
}
```

## Scaling Considerations

### Horizontal Scaling
- Stateless API design for easy replication
- Load balancing across multiple instances
- Database connection pooling

### Caching Strategy
- Redis for frequent data queries
- In-memory caching for API responses
- CDN for static assets

### Performance Optimization
- Query optimization for database operations
- Pagination for large data sets
- Compression of API responses
- Async processing for non-critical operations

## Security Measures

### Data Protection
- HTTPS enforcement
- Input validation and sanitization
- SQL/NoSQL injection prevention
- XSS protection

### Authentication Security
- Password strength requirements
- Rate limiting on authentication endpoints
- Token-based authentication
- Secure cookie settings

### API Security
- CORS configuration
- Rate limiting for API endpoints
- Request size limitations
- Sensitive data encryption

## Monitoring and Logging

### Logging Strategy
- Structured logging with Winston
- Log levels (error, warn, info, debug)
- Request/response logging
- Error tracking with stack traces

### Monitoring Tools
- Application metrics with Prometheus
- Dashboard visualization with Grafana
- Real-time error tracking with Sentry
- API usage analytics

## Deployment Pipeline

### Development Workflow
1. Local development with environment variables
2. Pull request review process
3. Automated testing with CI/CD pipeline
4. Staging environment deployment
5. Production deployment approval

### Environments
- Development: For active development
- Staging: For testing before production
- Production: Live environment

### Deployment Process
1. Build TypeScript to JavaScript
2. Run tests
3. Create Docker image
4. Push to container registry
5. Deploy to target environment
6. Run database migrations
7. Health check verification

## Disaster Recovery

### Backup Strategy
- Regular database backups
- Automated backup verification
- Cross-region backup storage

### Recovery Procedures
- Database restoration process
- Environment recreation scripts
- Rollback procedures for failed deployments

## Maintenance Procedures

### Regular Maintenance
- Dependency updates
- Security patches
- Database optimization
- Log rotation and cleanup

### Performance Tuning
- Regular performance audits
- Database query optimization
- Caching strategy adjustments
- Load testing
