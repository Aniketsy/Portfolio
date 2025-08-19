
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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
  // If user is not authenticated, respond with a message
  if (!(req as any).user) {
    return res.status(401).json({ message: 'You need to login to have personal chat.' });
  }
  try {
    const { userId, message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key not set' });
    }

    // Call Gemini API for chat
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey,
      {
        contents: [
          {
            parts: [
              { text: `You are an AI assistant that answers questions about the portfolio owner. Be concise and helpful.\nUser: ${message}` }
            ]
          }
        ]
      }
    );
    const response = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';

    const prisma = new PrismaClient();
    const chatMessage = await prisma.chatMessage.create({
      data: { userId, message, response }
    });
    res.status(201).json({ response });
  } catch (error) {
    let errorMsg = 'Failed to get AI response';
    if (typeof error === 'object' && error !== null) {
      if ('response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
        errorMsg = JSON.stringify(error.response.data);
      } else if ('message' in error) {
        errorMsg = (error as any).message;
      }
    }
    console.error('Gemini API chat error:', errorMsg, '\nFull error:', error);
    res.status(400).json({ message: 'Failed to get AI response', error: errorMsg });
  }
};
