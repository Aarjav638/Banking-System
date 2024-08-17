// pages/api/payees.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, accountNumber } = req.body;

    // Implement user authentication logic to get userId
    const userId = 'your-user-id'; // Replace with actual user ID from session

    try {
      const payee = await prisma.payee.create({
        data: {
          name,
          accountNumber,
          userId,
        },
      });
      res.status(201).json(payee);
    } catch (error) {
      res.status(500).json({ message: 'Error creating payee' });
    }
  } else if (req.method === 'GET') {
    // Implement user authentication logic to get userId
    const userId = 'your-user-id'; // Replace with actual user ID from session

    try {
      const payees = await prisma.payee.findMany({ where: { userId } });
      res.status(200).json(payees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payees' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
