# Backend Setup Instructions

This guide provides step-by-step instructions for setting up and running the backend server for the portfolio website. Follow these instructions to get the backend up and running for local development or production deployment.

## Prerequisites

Before setting up the backend, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- MongoDB (v4.4 or higher)
- Git
- Visual Studio Code or another code editor

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aniketsy/Portfolio.git
cd Portfolio
```

### 2. Create Backend Directory

```bash
mkdir backend
cd backend
```

### 3. Initialize Node.js Project

```bash
npm init -y
```

### 4. Install Dependencies

```bash
npm install express mongoose dotenv cors helmet jsonwebtoken bcrypt multer morgan winston axios socket.io validator
npm install -D typescript ts-node nodemon @types/express @types/node @types/mongoose @types/cors @types/jsonwebtoken @types/bcrypt @types/multer @types/morgan
```

### 5. Set Up TypeScript Configuration

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

### 6. Create Environment Variables

Create a `.env` file in the backend directory:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# AI/ML Service APIs
HUGGINGFACE_API_KEY=your_huggingface_api_key
OPENAI_API_KEY=your_openai_api_key

# Storage Service
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-portfolio-bucket

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-app-password

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 7. Create Basic Directory Structure

```bash
mkdir -p src/api/v1 src/config src/controllers src/middleware src/models src/services src/utils src/types
```

### 8. Set Up Server Configuration

Create `src/config/index.ts`:

```typescript
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  ai: {
    huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
  },
  storage: {
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsS3Bucket: process.env.AWS_S3_BUCKET,
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
};

export default config;
```

### 9. Set Up Database Connection

Create `src/config/database.ts`:

```typescript
import mongoose from 'mongoose';
import config from './index';
import logger from '../utils/logger';

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database.uri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDatabase;
```

### 10. Create Logger Utility

Create `src/utils/logger.ts`:

```typescript
import winston from 'winston';
import config from '../config';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: config.server.nodeEnv === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
```

### 11. Create Main App File

Create `src/app.ts`:

```typescript
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import connectDatabase from './config/database';
import logger from './utils/logger';

// Import routes (to be created later)
// import authRoutes from './api/v1/auth';
// import projectRoutes from './api/v1/projects';
// etc.

// Initialize express app
const app: Express = express();

// Connect to database
connectDatabase();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Portfolio API Server' });
});

// Apply routes (uncomment when routes are created)
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/projects', projectRoutes);
// etc.

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

export default app;
```

### 12. Create Server Entry Point

Create `src/server.ts`:

```typescript
import app from './app';
import config from './config';
import logger from './utils/logger';

const PORT = config.server.port;

app.listen(PORT, () => {
  logger.info(`Server running in ${config.server.nodeEnv} mode on port ${PORT}`);
});
```

### 13. Update package.json Scripts

Add the following scripts to your package.json:

```json
"scripts": {
  "start": "node dist/server.js",
  "dev": "nodemon --exec ts-node src/server.ts",
  "build": "tsc",
  "lint": "eslint . --ext .ts",
  "test": "jest"
}
```

### 14. Start Development Server

```bash
npm run dev
```

## Creating Basic Models

### User Model

Create `src/models/user.model.ts`:

```typescript
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
```

### Project Model

Create `src/models/project.model.ts`:

```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    githubUrl: {
      type: String,
    },
    demoUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>('Project', projectSchema);
```

## Setting Up Authentication

### Auth Controller

Create `src/controllers/auth.controller.ts`:

```typescript
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import config from '../config';
import logger from '../utils/logger';

// Generate JWT token
const generateToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

// Register a new user (admin only for this portfolio)
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with that email or username' 
      });
    }

    // Create new user with admin role
    const user = new User({
      username,
      email,
      password,
      role: 'admin', // Default to admin for portfolio site
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    logger.error('Error in register:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    logger.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    logger.error('Error in getCurrentUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
```

### Auth Middleware

Create `src/middleware/auth.middleware.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

// Extend the Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string, role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Not authorized' 
      });
    }
    next();
  };
};
```

### Auth Routes

Create `src/api/v1/auth.ts`:

```typescript
import express from 'express';
import { register, login, getCurrentUser } from '../../controllers/auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user route (protected)
router.get('/me', authenticate, getCurrentUser);

export default router;
```

## Production Deployment Considerations

### 1. Building for Production

```bash
npm run build
```

This will compile TypeScript files to JavaScript in the `dist` directory.

### 2. Setting Up Environment Variables for Production

Create a production `.env` file with appropriate settings:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
# Other production settings
```

### 3. Deployment Options

#### Option 1: Traditional Hosting (e.g., VPS)

1. Set up a Linux server (Ubuntu/Debian recommended)
2. Install Node.js, npm, and MongoDB
3. Clone your repository
4. Install dependencies: `npm install --production`
5. Build the app: `npm run build`
6. Use PM2 to manage the Node.js process:
   ```
   npm install -g pm2
   pm2 start dist/server.js --name "portfolio-backend"
   pm2 startup
   pm2 save
   ```

#### Option 2: Docker Deployment

1. Create a `Dockerfile`:
   ```dockerfile
   FROM node:16-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install --production

   COPY dist/ ./dist/

   EXPOSE 5000

   CMD ["node", "dist/server.js"]
   ```

2. Build and run Docker container:
   ```bash
   docker build -t portfolio-backend .
   docker run -p 5000:5000 --env-file .env.production -d portfolio-backend
   ```

#### Option 3: Cloud Platforms

- **Heroku**:
  - Add a `Procfile`: `web: node dist/server.js`
  - Set environment variables in Heroku dashboard
  - Deploy using Heroku CLI or GitHub integration

- **AWS Elastic Beanstalk**:
  - Create an `Elastic Beanstalk` environment
  - Configure environment variables
  - Deploy using AWS CLI or EB CLI

- **Google Cloud Run**:
  - Build Docker container
  - Push to Google Container Registry
  - Deploy to Cloud Run with environment variables

### 4. Setting Up MongoDB

#### Option 1: Self-hosted MongoDB
- Install MongoDB on your server
- Configure security and backups
- Connect using local URI

#### Option 2: MongoDB Atlas (Recommended)
- Create a free or paid cluster
- Configure network access and database users
- Use the connection string provided by Atlas

### 5. SSL/TLS Setup

For production, ensure you have SSL/TLS configured:

- If using a reverse proxy like Nginx:
  ```nginx
  server {
      listen 443 ssl;
      server_name api.yourportfolio.com;

      ssl_certificate /path/to/cert.pem;
      ssl_certificate_key /path/to/key.pem;

      location / {
          proxy_pass http://localhost:5000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
  }
  ```

- If using a cloud provider, they often provide SSL/TLS termination

## Continuous Integration/Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Backend

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: |
        cd backend
        npm install
        
    - name: Run tests
      run: |
        cd backend
        npm test
        
    - name: Build
      run: |
        cd backend
        npm run build
        
    # Add deployment steps based on your hosting choice
    # Examples:
    # - Deploy to Heroku
    # - Deploy to AWS
    # - Deploy using SSH and PM2
```

## Maintenance and Monitoring

### Setting Up Monitoring with PM2

```bash
pm2 install pm2-server-monit
pm2 install pm2-logrotate
```

### Database Backups

Create a backup script `scripts/backup-db.js`:

```javascript
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create backups directory if it doesn't exist
const backupDir = path.join(__dirname, '../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Create backup filename with date
const date = new Date();
const backupFilename = `portfolio-backup-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.gz`;
const backupPath = path.join(backupDir, backupFilename);

// MongoDB connection string (use from environment in production)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const dbName = mongoUri.split('/').pop().split('?')[0];

// Execute mongodump command
const cmd = `mongodump --uri="${mongoUri}" --archive="${backupPath}" --gzip`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Backup created successfully at ${backupPath}`);
});
```

Add to package.json:

```json
"scripts": {
  "backup": "node scripts/backup-db.js"
}
```

Set up a cron job to run daily:

```bash
0 0 * * * cd /path/to/your/app && npm run backup
```

## Conclusion

This guide provides a comprehensive setup for the portfolio website backend. By following these instructions, you'll have a robust backend system capable of handling all the features required for your portfolio, including chat interaction, image classification, voice commands, and more.

For additional information or troubleshooting, refer to the documentation of the individual packages used in this project.
