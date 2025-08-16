import { Router } from 'express';
import { submitContact, getContacts } from '../controllers/contactController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', submitContact);
router.get('/', authenticate, getContacts);

export default router;
