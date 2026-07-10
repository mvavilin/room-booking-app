import { isWithinInterval, parse } from 'date-fns';
import type { BookingDto } from '@entities/booking';

export function findBookingByTime(bookings: BookingDto[], time: string): BookingDto | undefined {
  const slot = parse(time, 'HH:mm', new Date());

  return bookings.find((booking) =>
    isWithinInterval(slot, {
      start: booking.start,
      end: booking.finish,
    })
  );
}
