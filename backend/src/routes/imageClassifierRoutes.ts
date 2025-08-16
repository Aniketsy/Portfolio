import { Router } from 'express';
import { getClassifications, classifyImage } from '../controllers/imageClassifierController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getClassifications);
router.post('/', classifyImage);

export default router;
