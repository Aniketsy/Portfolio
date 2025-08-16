import { Router } from 'express';
import { getChatHistory, sendMessage } from '../controllers/chatController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getChatHistory);
router.post('/', sendMessage);

export default router;
