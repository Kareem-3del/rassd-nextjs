import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const sections = await prisma.section.findMany();
        res.status(200).json(sections);
    } else if (req.method === 'POST') {
        const { name, groupId } = req.body;
        const section = await prisma.section.create({
            data: { name, groupId },
        });
        res.status(201).json(section);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
