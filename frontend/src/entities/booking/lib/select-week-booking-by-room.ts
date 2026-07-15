import type { BookingDto, BookingStore } from '@entities/booking';

export const selectWeekBookingsByRoom =
  (documentId: string) =>
  (state: BookingStore): BookingDto[] | undefined =>
    state.weekBookingsByRoomDocumentId[documentId];
