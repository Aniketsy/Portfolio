import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
  const prisma = new PrismaClient();
  const testimonials = await prisma.testimonial.findMany({ where: { approved: true } });
  res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
  const prisma = new PrismaClient();
  const testimonial = await prisma.testimonial.create({ data: req.body });
  res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const approveTestimonial = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    const testimonial = await prisma.testimonial.update({
      where: { id: Number(req.params.id) },
      data: { approved: true }
    });
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Invalid request' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
  const prisma = new PrismaClient();
  await prisma.testimonial.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid request' });
  }
};
