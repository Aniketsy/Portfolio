import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    // Placeholder for AI response integration
    const response = 'This is a placeholder response.';
    const prisma = new PrismaClient();
    const chatMessage = await prisma.chatMessage.create({
      data: { userId, message, response }
    });
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
