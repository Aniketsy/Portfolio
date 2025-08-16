import { Router } from 'express';
import { getAllTestimonials, createTestimonial, approveTestimonial, deleteTestimonial } from '../controllers/testimonialController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getAllTestimonials);
router.post('/', createTestimonial);
router.patch('/:id/approve', authenticate, approveTestimonial);
router.delete('/:id', authenticate, deleteTestimonial);

export default router;
