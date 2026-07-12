import type { BookingDto, BookingStore } from '@entities/booking';
import { isWithinInterval, set } from 'date-fns';

const EMPTY_BOOKINGS: BookingDto[] = [];

export const selectBookingsByRoom =
  (roomId: number) =>
  (state: BookingStore): BookingDto[] =>
    state.bookingsByRoomId[roomId] ?? EMPTY_BOOKINGS;

export const selectWeekBookingsByRoom =
  (roomId: number) =>
  (state: BookingStore): BookingDto[] =>
    state.weekBookingsByRoomId[roomId] ?? [];

export function findBookingByDateTime(
  bookings: BookingDto[],
  date: Date,
  time: string
): BookingDto | undefined {
  const [hours = 0, minutes = 0] = time.split(':').map(Number);

  const current = set(date, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  });

  return bookings.find((booking) =>
    isWithinInterval(current, {
      start: new Date(booking.start),
      end: new Date(booking.finish),
    })
  );
}
