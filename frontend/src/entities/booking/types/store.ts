import type { BookingDto, CreateBookingDto, UpdateBookingDto } from '@entities/booking';

export interface BookingStore {
  bookingsByRoomId: Record<string, BookingDto[]>;

  loadRoomBookings(roomId: number): Promise<void>;

  createBooking(data: CreateBookingDto): Promise<void>;
  updateBooking(id: string, data: UpdateBookingDto): Promise<void>;
  deleteBooking(id: string): Promise<void>;
}
