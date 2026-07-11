import { isBefore, startOfToday } from 'date-fns';
import { z } from 'zod';

export const bookingSchema = z
  .object({
    date: z
      .date({
        error: 'Выберите дату',
      })
      .refine((value) => !isBefore(value, startOfToday()), {
        message: 'Дата не может быть раньше сегодня',
      }),

    startTime: z.string().min(1, 'Выберите время начала'),

    finishTime: z.string().min(1, 'Выберите время окончания'),
  })

  .refine((data) => data.startTime < data.finishTime, {
    message: 'Время окончания должно быть позже начала',
    path: ['finishTime'],
  });

export type BookingFormValues = z.infer<typeof bookingSchema>;
