import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'DELETE': {
        const { id } = req.query;
        const invite = await prisma.invite.delete({
          where: { id }
        });

        return res.status(200).json('Ok');
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
