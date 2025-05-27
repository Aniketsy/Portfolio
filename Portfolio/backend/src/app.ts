import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './config/database';
import authRoutes from './routes/auth';
import portfolioRoutes from './routes/portfolio';
import { isAuthenticated } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectToDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', isAuthenticated, portfolioRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});