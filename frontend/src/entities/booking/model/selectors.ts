import type { BookingDto, BookingStore } from '@entities/booking';

const EMPTY_BOOKINGS: BookingDto[] = [];

export const selectBookingsByRoom =
  (roomId: number) =>
  (state: BookingStore): BookingDto[] =>
    state.bookingsByRoomId[roomId] ?? EMPTY_BOOKINGS;
