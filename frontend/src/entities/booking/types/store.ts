import type { BookingDto, UpdateBookingDto } from '@entities/booking';

export interface BookingStore {
  bookingsByRoomId: Record<string, BookingDto[]>;

  loadRoomBookings(roomId: number): Promise<void>;

  updateBooking(id: string, data: UpdateBookingDto): Promise<void>;
}
