import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get('/hello', async (req, res) => {
  const habits = await prisma.habit.findMany({
    where: {
      title: {
        startsWith: 'Drink',
      },
    },
  });

  return habits;
});

app
  .listen({ port: 3333 })
  .then(() => console.log('Server running on http://localhost:3333'));
