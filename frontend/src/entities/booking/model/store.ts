import { create } from 'zustand';
import {
  bookingService,
  type BookingDto,
  type BookingStore,
  type GetBookingsParameters,
} from '@entities/booking';
import { startOfDay, endOfDay } from 'date-fns';

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  bookingsByRoom: {},
  pagination: undefined,
  currentBooking: undefined,
  loading: false,

  async getBookings(parameters?: GetBookingsParameters): Promise<void> {
    set({ loading: true });

    try {
      const { data, pagination } = await bookingService.getBookings(parameters);

      set({
        bookings: data,
        pagination,
      });
    } finally {
      set({ loading: false });
    }
  },

  async getBooking(documentId): Promise<void> {
    set({ loading: true });

    try {
      const booking = await bookingService.getBooking(documentId);

      set({
        currentBooking: booking,
      });
    } finally {
      set({ loading: false });
    }
  },

  async createBooking(booking): Promise<void> {
    const createdBooking = await bookingService.createBooking(booking);

    set((state) => ({
      bookings: [...state.bookings, createdBooking],
    }));
  },

  async updateBooking(documentId, booking): Promise<void> {
    const updatedBooking = await bookingService.updateBooking(documentId, booking);

    set((state) => ({
      bookings: state.bookings.map((item) =>
        item.documentId === documentId ? updatedBooking : item
      ),
    }));
  },

  async deleteBooking(documentId): Promise<void> {
    await bookingService.deleteBooking(documentId);

    set((state) => ({
      bookings: state.bookings.filter((item) => item.documentId !== documentId),
    }));
  },

  async loadBookingsForRooms(roomIds: number[], date: Date = new Date()): Promise<void> {
    const { data: bookings } = await bookingService.getBookings({
      filters: {
        roomId: {
          roomId: { $in: roomIds },
        },
        start: { $lte: endOfDay(date) },
        finish: { $gte: startOfDay(date) },
      },
      populate: '*',
    });

    const bookingsByRoom: Record<number, BookingDto[]> = {};

    for (const roomId of roomIds) bookingsByRoom[roomId] = [];

    for (const booking of bookings) {
      const roomId = booking.roomId.roomId;

      if (bookingsByRoom[roomId] === undefined) bookingsByRoom[roomId] = [];

      bookingsByRoom[roomId].push(booking);
    }

    console.log(bookingsByRoom);

    set({ bookingsByRoom });
  },
}));
