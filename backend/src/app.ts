
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import contactRoutes from './routes/contactRoutes';
import chatRoutes from './routes/chatRoutes';
import imageClassifierRoutes from './routes/imageClassifierRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API Server is running.' });
});


// Mount all feature routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/image-classifier', imageClassifierRoutes);
app.use('/api/admin', adminRoutes);

export default app;
