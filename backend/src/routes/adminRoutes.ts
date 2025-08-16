import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';

const router = Router();

// List all users
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Delete a project
router.delete('/projects/:id', authenticate, requireAdmin, async (req, res) => {
  await prisma.project.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Project deleted' });
});

// Delete a testimonial
router.delete('/testimonials/:id', authenticate, requireAdmin, async (req, res) => {
  await prisma.testimonial.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Testimonial deleted' });
});

// Delete a contact
router.delete('/contacts/:id', authenticate, requireAdmin, async (req, res) => {
  await prisma.contact.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Contact deleted' });
});

export default router;
