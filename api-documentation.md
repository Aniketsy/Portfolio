# API Documentation for Portfolio Backend

## Base URL
```
https://api.yourportfolio.com/v1
```

## Authentication
Most endpoints require authentication. Send a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## 1. Authentication API

### Register Admin User
```
POST /auth/register
```
**Request Body:**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "secure_password"
}
```
**Response:**
```json
{
  "id": "user_id",
  "username": "admin",
  "email": "admin@example.com",
  "createdAt": "2025-07-30T12:00:00Z"
}
```

### Login
```
POST /auth/login
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure_password"
}
```
**Response:**
```json
{
  "token": "jwt_token",
  "expiresIn": 3600,
  "user": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

## 2. Projects API

### Get All Projects
```
GET /projects
```
**Query Parameters:**
- `limit`: Maximum number of projects to return (default: 10)
- `page`: Page number for pagination (default: 1)
- `tags`: Filter by tags (comma-separated)
- `sort`: Sort field (title, date, etc.)
- `order`: Sort order (asc, desc)

**Response:**
```json
{
  "projects": [
    {
      "id": "project_id_1",
      "title": "CNN Image Classifier",
      "description": "A convolutional neural network for image classification...",
      "image": "https://storage.example.com/projects/image1.jpg",
      "tags": ["Computer Vision", "CNN", "TensorFlow", "Docker"],
      "githubUrl": "https://github.com/username/project",
      "demoUrl": "https://demo.example.com",
      "createdAt": "2025-06-15T10:00:00Z",
      "updatedAt": "2025-07-20T14:30:00Z"
    },
    // More projects...
  ],
  "total": 15,
  "page": 1,
  "limit": 10
}
```

### Get Project by ID
```
GET /projects/:id
```
**Response:**
```json
{
  "id": "project_id_1",
  "title": "CNN Image Classifier",
  "description": "A convolutional neural network for image classification...",
  "image": "https://storage.example.com/projects/image1.jpg",
  "tags": ["Computer Vision", "CNN", "TensorFlow", "Docker"],
  "githubUrl": "https://github.com/username/project",
  "demoUrl": "https://demo.example.com",
  "createdAt": "2025-06-15T10:00:00Z",
  "updatedAt": "2025-07-20T14:30:00Z"
}
```

### Create Project (Admin Only)
```
POST /projects
```
**Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description...",
  "tags": ["AI", "NLP", "Python"],
  "githubUrl": "https://github.com/username/project",
  "demoUrl": "https://demo.example.com"
}
```
**Response:**
```json
{
  "id": "new_project_id",
  "title": "New Project",
  "description": "Project description...",
  "tags": ["AI", "NLP", "Python"],
  "githubUrl": "https://github.com/username/project",
  "demoUrl": "https://demo.example.com",
  "createdAt": "2025-07-30T12:00:00Z",
  "updatedAt": "2025-07-30T12:00:00Z"
}
```

### Update Project (Admin Only)
```
PUT /projects/:id
```
**Request Body:**
```json
{
  "title": "Updated Project Title",
  "description": "Updated description...",
  "tags": ["AI", "NLP", "Python"],
  "githubUrl": "https://github.com/username/project",
  "demoUrl": "https://demo.example.com"
}
```
**Response:**
```json
{
  "id": "project_id",
  "title": "Updated Project Title",
  "description": "Updated description...",
  "tags": ["AI", "NLP", "Python"],
  "githubUrl": "https://github.com/username/project",
  "demoUrl": "https://demo.example.com",
  "createdAt": "2025-06-15T10:00:00Z",
  "updatedAt": "2025-07-30T12:05:00Z"
}
```

### Delete Project (Admin Only)
```
DELETE /projects/:id
```
**Response:**
```json
{
  "message": "Project successfully deleted"
}
```

### Upload Project Image (Admin Only)
```
POST /projects/:id/image
```
**Request:**
Form-data with 'image' field containing the image file.

**Response:**
```json
{
  "imageUrl": "https://storage.example.com/projects/image1.jpg"
}
```

## 3. Chat API

### Get Chat Response
```
POST /chat/response
```
**Request Body:**
```json
{
  "message": "Tell me about your machine learning experience",
  "sessionId": "optional_session_id"
}
```
**Response:**
```json
{
  "response": "I have 5+ years of experience in machine learning, with expertise in deep learning frameworks like TensorFlow and PyTorch.",
  "sessionId": "session_id"
}
```

### Get Chat History
```
GET /chat/history/:sessionId
```
**Response:**
```json
{
  "messages": [
    {
      "id": "msg_id_1",
      "text": "Tell me about your machine learning experience",
      "isUser": true,
      "timestamp": "2025-07-30T12:00:00Z"
    },
    {
      "id": "msg_id_2",
      "text": "I have 5+ years of experience in machine learning...",
      "isUser": false,
      "timestamp": "2025-07-30T12:00:05Z"
    }
  ],
  "sessionId": "session_id"
}
```

### Manage Predefined Responses (Admin Only)
```
GET /chat/predefined-responses
```
**Response:**
```json
{
  "responses": [
    {
      "id": "resp_id_1",
      "text": "As an AI specialist, I focus on developing models...",
      "category": "experience",
      "createdAt": "2025-06-15T10:00:00Z"
    }
  ]
}
```

## 4. Image Classification API

### Classify Image
```
POST /classify/image
```
**Request:**
Form-data with 'image' field containing the image file.

**Response:**
```json
{
  "predictions": [
    {
      "label": "Neural Network",
      "probability": 0.92
    },
    {
      "label": "Deep Learning",
      "probability": 0.85
    },
    {
      "label": "Artificial Intelligence",
      "probability": 0.76
    }
  ],
  "processingTime": "0.5s",
  "imageId": "img_id_123"
}
```

## 5. Voice Navigation API

### Process Voice Command
```
POST /voice/command
```
**Request Body:**
```json
{
  "transcript": "navigate to projects",
  "userId": "optional_user_id"
}
```
**Response:**
```json
{
  "command": "navigate",
  "target": "projects",
  "action": "window.location.href = '#projects'",
  "message": "Navigating to projects section"
}
```

### Get Custom Commands (Admin Only)
```
GET /voice/commands
```
**Response:**
```json
{
  "commands": [
    {
      "id": "cmd_id_1",
      "phrase": "navigate to projects",
      "action": "window.location.href = '#projects'",
      "description": "Navigate to projects section",
      "createdAt": "2025-06-15T10:00:00Z"
    }
  ]
}
```

## 6. Testimonials API

### Get All Testimonials
```
GET /testimonials
```
**Query Parameters:**
- `limit`: Maximum number of testimonials to return (default: 10)
- `page`: Page number for pagination (default: 1)
- `approved`: Filter by approval status (true/false)

**Response:**
```json
{
  "testimonials": [
    {
      "id": "testimonial_id_1",
      "name": "Jane Doe",
      "position": "CTO at Tech Company",
      "content": "Great collaboration on our AI project...",
      "rating": 5,
      "approved": true,
      "createdAt": "2025-06-15T10:00:00Z"
    }
  ],
  "total": 8,
  "page": 1,
  "limit": 10
}
```

### Submit Testimonial
```
POST /testimonials
```
**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "position": "Lead Developer",
  "content": "It was a pleasure working with you...",
  "rating": 5
}
```
**Response:**
```json
{
  "id": "testimonial_id_2",
  "name": "John Smith",
  "position": "Lead Developer",
  "content": "It was a pleasure working with you...",
  "rating": 5,
  "approved": false,
  "createdAt": "2025-07-30T12:00:00Z"
}
```

### Approve Testimonial (Admin Only)
```
PUT /testimonials/:id/approve
```
**Response:**
```json
{
  "id": "testimonial_id_2",
  "approved": true,
  "updatedAt": "2025-07-30T12:10:00Z"
}
```

## 7. Contact API

### Submit Contact Form
```
POST /contact
```
**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Project Collaboration",
  "message": "I'd like to discuss a potential collaboration..."
}
```
**Response:**
```json
{
  "id": "contact_id_1",
  "received": true,
  "message": "Thank you for your message. I'll get back to you soon."
}
```

### Get Contact Submissions (Admin Only)
```
GET /contact
```
**Query Parameters:**
- `limit`: Maximum number of contacts to return (default: 10)
- `page`: Page number for pagination (default: 1)
- `status`: Filter by status (new, read, replied)

**Response:**
```json
{
  "contacts": [
    {
      "id": "contact_id_1",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "subject": "Project Collaboration",
      "message": "I'd like to discuss a potential collaboration...",
      "status": "new",
      "createdAt": "2025-07-30T12:00:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 10
}
```

## 8. Skills API

### Get All Skills
```
GET /skills
```
**Response:**
```json
{
  "categories": [
    {
      "id": "cat_id_1",
      "name": "Machine Learning",
      "skills": [
        {
          "id": "skill_id_1",
          "name": "Regression",
          "proficiency": 90
        },
        {
          "id": "skill_id_2",
          "name": "Classification",
          "proficiency": 95
        }
      ]
    }
  ]
}
```

### Update Skills (Admin Only)
```
PUT /skills/categories/:id
```
**Request Body:**
```json
{
  "name": "Updated Category Name",
  "skills": [
    {
      "id": "skill_id_1",
      "name": "Regression",
      "proficiency": 95
    }
  ]
}
```
**Response:**
```json
{
  "id": "cat_id_1",
  "name": "Updated Category Name",
  "skills": [
    {
      "id": "skill_id_1",
      "name": "Regression",
      "proficiency": 95
    }
  ],
  "updatedAt": "2025-07-30T12:15:00Z"
}
```

## 9. Analytics API (Admin Only)

### Get Portfolio Analytics
```
GET /analytics
```
**Query Parameters:**
- `period`: Time period (day, week, month, year)
- `startDate`: Start date for custom period
- `endDate`: End date for custom period

**Response:**
```json
{
  "visitors": {
    "total": 1250,
    "unique": 980,
    "trend": "+15%"
  },
  "pageViews": {
    "total": 3600,
    "byPage": {
      "home": 1200,
      "projects": 950,
      "about": 750,
      "contact": 700
    }
  },
  "interactions": {
    "chatMessages": 320,
    "imageClassifications": 180,
    "voiceCommands": 90
  },
  "period": "month",
  "dateRange": {
    "start": "2025-07-01T00:00:00Z",
    "end": "2025-07-30T23:59:59Z"
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": {
    "field": "Error description"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The requested resource was not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```
