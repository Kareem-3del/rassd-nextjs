import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    } else if (req.method === 'POST') {
        const {
            establishmentName,
            image,
            address,
            ownerName,
            idNumber,
            startDate,
            endDate,
            inspectorId,
            reviewerId,
            qualityControllerId,
            status,
            items,
        } = req.body;

        const newTask = await prisma.task.create({
            data: {
                establishmentName,
                image,
                address,
                ownerName,
                idNumber,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                inspectorId,
                reviewerId,
                qualityControllerId,
                status,
                items: { create: items },
            },
        });

        res.status(201).json(newTask);
    } else if (req.method === 'PATCH') {
        const { id, updates } = req.body;
        const updatedTask = await prisma.task.update({
            where: { id },
            data: updates,
        });
        res.status(200).json(updatedTask);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
