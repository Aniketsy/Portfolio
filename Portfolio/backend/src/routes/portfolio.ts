import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolioController';

const router = Router();
const portfolioController = new PortfolioController();

// Define routes for portfolio-related actions
router.get('/projects', portfolioController.getAllProjects.bind(portfolioController));
router.post('/projects', portfolioController.addProject.bind(portfolioController));

export default router;