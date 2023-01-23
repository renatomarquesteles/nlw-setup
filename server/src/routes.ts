import dayjs from 'dayjs';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from './lib/prisma';

export const appRoutes = async (app: FastifyInstance) => {
  // Create a new Habit
  app.post('/habits', async (req) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    }); // Data validation

    const { title, weekDays } = createHabitBody.parse(req.body);

    const today = dayjs().startOf('day').toDate(); // Reset datetime to 00:00

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  // List all habits from a specific date
  app.get('/day', async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(req.query);

    const parsedDate = dayjs(date).startOf('day'); // Reset datetime to 00:00
    const weekDay = parsedDate.get('day');

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date, // Less than or equal to the current date
        },
        weekDays: {
          some: {
            week_day: weekDay, // Registered to the current week day
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(), // Gets the date info
      },
      include: {
        dayHabits: true, // Includes the completed habits on that day
      },
    });

    const completedHabitsIds = day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id;
    });

    return {
      possibleHabits,
      completedHabitsIds,
    };
  });
};
