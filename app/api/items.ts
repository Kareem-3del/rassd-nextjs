import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const items = await prisma.item.findMany();
        res.status(200).json(items);
    } else if (req.method === 'POST') {
        const { name, sectionId } = req.body;
        const item = await prisma.item.create({
            data: { name, sectionId },
        });
        res.status(201).json(item);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
