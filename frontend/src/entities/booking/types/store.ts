import type { BookingDto, CreateBookingDto, UpdateBookingDto } from '@entities/booking';

export interface BookingConflictResult {
  conflict: boolean;
  nextAvailableTime: Date | undefined;
}

export interface BookingStore {
  bookingsByRoomId: Record<string, BookingDto[]>;
  weekBookingsByRoomId: Record<number, BookingDto[]>;

  weekLoading: boolean;
  weekError: boolean;

  loadRoomBookings(roomId: number): Promise<void>;

  createBooking(data: CreateBookingDto): Promise<void>;
  updateBooking(id: string, data: UpdateBookingDto): Promise<void>;
  deleteBooking(id: string): Promise<void>;

  checkBookingConflict(
    roomId: number,
    start: Date,
    finish: Date
  ): Promise<BookingConflictResult | undefined>;

  loadRoomWeekBookings(roomId: number): Promise<void>;
}
