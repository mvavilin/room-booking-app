import type {
  BookingDto,
  CreateBookingDto,
  GetBookingsParameters,
  UpdateBookingDto,
} from '@entities/booking';
import type { Pagination } from '@shared/api';

export interface BookingStore {
  bookings: BookingDto[];
  pagination: Pagination | undefined;
  currentBooking: BookingDto | undefined;

  bookingVersion: number;

  getBookings: (parameters?: GetBookingsParameters) => Promise<void>;

  getBooking: (documentId: string) => Promise<void>;

  createBooking: (booking: CreateBookingDto) => Promise<void>;

  updateBooking: (documentId: string, booking: UpdateBookingDto) => Promise<void>;

  deleteBooking: (documentId: string) => Promise<void>;
}
