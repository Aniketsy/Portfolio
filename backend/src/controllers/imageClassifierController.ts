import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// import multer for file upload if needed

export const getClassifications = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    const results = await prisma.imageClassification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const classifyImage = async (req: Request, res: Response) => {
  try {
    // Placeholder: In production, handle file upload and ML API call
    const { userId, imageUrl } = req.body;
    const result = 'cat'; // Placeholder result
    const prisma = new PrismaClient();
    const classification = await prisma.imageClassification.create({
      data: { userId, imageUrl, result }
    });
    res.status(201).json(classification);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
