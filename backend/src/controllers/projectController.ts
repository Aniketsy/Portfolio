import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const getAllProjects = async (req: Request, res: Response) => {
  try {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany();
  res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
  const prisma = new PrismaClient();
  const project = await prisma.project.create({ data: req.body });
  res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
