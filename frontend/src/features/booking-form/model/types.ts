import { z } from 'zod';
import type { bookingFormSchema } from '@features/booking-form';

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
