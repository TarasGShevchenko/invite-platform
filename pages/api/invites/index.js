import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST': {
        const {
          email,
          message,
          details,
          completed,
          important,
          date,
        } = req.body;

        const new_invite = await prisma.invite.create({
          data: {
            email,
            message,
            details,
            completed,
            important,
            date
          }
        });

        return res.status(201).json(new_invite);
      }
      case 'PUT': {
        const {
          id,
          email,
          message,
          details,
          completed,
          important,
          date
        } = req.body;

        const data = {};
        if (email !== undefined) data.email = email;
        if (message !== undefined) data.message = message;
        if (details !== undefined) data.details = details;
        if (completed !== undefined) data.completed = completed;
        if (important !== undefined) data.important = important;
        if (date !== undefined) data.date = date;

        const invite_updated = await prisma.invite.update({
          where: {
            id
          },
          data
        });

        return res.status(201).json(invite_updated);
      }
      case 'GET': {
        const invites = await prisma.invite.findMany();

        return res.status(200).json(invites);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
