import { Router } from 'express';
import { getAllProjects, createProject } from '../controllers/projectController';

const router = Router();

router.get('/', getAllProjects);
router.post('/', createProject);

export default router;
