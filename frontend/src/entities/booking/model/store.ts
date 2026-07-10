import { create } from 'zustand';
import { bookingService, type BookingStore, type GetBookingsParameters } from '@entities/booking';

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  pagination: undefined,
  currentBooking: undefined,

  async getBookings(parameters?: GetBookingsParameters): Promise<void> {
    const { data, pagination } = await bookingService.getBookings(parameters);

    set({
      bookings: data,
      pagination,
    });
  },

  async getBooking(documentId: string): Promise<void> {
    const booking = await bookingService.getBooking(documentId);

    set({
      currentBooking: booking,
    });
  },

  async createBooking(booking): Promise<void> {
    const createdBooking = await bookingService.createBooking(booking);

    set((state) => ({
      bookings: [...state.bookings, createdBooking],
    }));
  },

  async updateBooking(documentId: string, booking): Promise<void> {
    const updatedBooking = await bookingService.updateBooking(documentId, booking);

    set((state) => ({
      bookings: state.bookings.map((item) =>
        item.documentId === documentId ? updatedBooking : item
      ),
    }));
  },

  async deleteBooking(documentId: string): Promise<void> {
    await bookingService.deleteBooking(documentId);

    set((state) => ({
      bookings: state.bookings.filter((item) => item.documentId !== documentId),
    }));
  },
}));
