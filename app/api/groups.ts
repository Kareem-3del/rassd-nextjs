import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const groups = await prisma.group.findMany();
        res.status(200).json(groups);
    } else if (req.method === 'POST') {
        const { name, type } = req.body;
        const group = await prisma.group.create({
            data: { name, type },
        });
        res.status(201).json(group);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
