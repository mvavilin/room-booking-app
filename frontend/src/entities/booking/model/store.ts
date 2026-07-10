import { create } from 'zustand';
import { bookingService, type BookingStore, type UpdateBookingDto } from '@entities/booking';
import { endOfDay, startOfDay } from 'date-fns';

export const useBookingStore = create<BookingStore>((set) => ({
  bookingsByRoomId: {},

  async loadRoomBookings(roomId): Promise<void> {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const result = await bookingService.getBookings({
      filters: {
        roomId: {
          $eq: roomId,
        },
        start: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      },
    });

    set((state) => ({
      bookingsByRoomId: {
        ...state.bookingsByRoomId,

        [roomId]: result.data,
      },
    }));
  },

  async updateBooking(id: string, data: UpdateBookingDto): Promise<void> {
    const updated = await bookingService.updateBooking(id, data);

    set((state) => {
      const newState = {
        ...state.bookingsByRoomId,
      };

      for (const roomId of Object.keys(newState)) {
        const bookings = newState[roomId];

        if (!bookings) continue;

        newState[roomId] = bookings.map((item) => (item.documentId === id ? updated : item));
      }

      return {
        bookingsByRoomId: newState,
      };
    });
  },
}));
