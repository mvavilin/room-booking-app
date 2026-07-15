import { isWithinInterval } from 'date-fns';
import type { BookingDto } from '@entities/booking';

export function findBookingByTime(bookings: BookingDto[], date: Date): BookingDto | undefined {
  return bookings.find((booking) =>
    isWithinInterval(date, {
      start: booking.start,
      end: booking.finish,
    })
  );
}
