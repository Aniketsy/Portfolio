import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const submitContact = async (req: Request, res: Response) => {
  try {
  const prisma = new PrismaClient();
  await prisma.contact.create({ data: req.body });
  res.status(201).json({ message: 'Message received' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
  const prisma = new PrismaClient();
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
