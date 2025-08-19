
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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
    const { userId, image } = req.body; // image: base64 string
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key not set' });
    }

    // Example Gemini API call (update endpoint and payload as per Gemini docs)
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + apiKey,
      {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: image.replace(/^data:image\/(png|jpeg);base64,/, ''),
                },
              },
              {
                text: 'Classify the main object in this image. Return only the label.'
              }
            ]
          }
        ]
      }
    );

    // Parse Gemini response (update as per actual API response)
    const result = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unknown';

    // Save to DB (optional)
    const prisma = new PrismaClient();
    const classification = await prisma.imageClassification.create({
      data: { userId, imageUrl: '', result }
    });
    res.status(201).json({ result });
  } catch (error) {
    let errorMsg = 'Failed to classify image';
    let fullError = error;
    if (typeof error === 'object' && error !== null) {
      if ('response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
        errorMsg = JSON.stringify(error.response.data);
      } else if ('message' in error) {
        errorMsg = (error as any).message;
      }
    }
    console.error('Gemini API error:', errorMsg, '\nFull error:', fullError);
    res.status(400).json({ message: 'Failed to classify image', error: errorMsg, fullError });
  }
};
