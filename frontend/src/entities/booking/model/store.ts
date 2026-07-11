import { create } from 'zustand';
import {
  bookingService,
  type BookingDto,
  type BookingStore,
  type CreateBookingDto,
  type UpdateBookingDto,
} from '@entities/booking';
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

  async createBooking(data: CreateBookingDto): Promise<void> {
    const created: BookingDto = await bookingService.createBooking(data);

    const roomId: number = created.roomId.id;

    set((state) => ({
      bookingsByRoomId: {
        ...state.bookingsByRoomId,

        [roomId]: [...(state.bookingsByRoomId[roomId] ?? []), created],
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

  async deleteBooking(id): Promise<void> {
    await bookingService.deleteBooking(id);

    set((state) => {
      const bookingsByRoomId = { ...state.bookingsByRoomId };

      for (const roomId in bookingsByRoomId) {
        bookingsByRoomId[roomId] = bookingsByRoomId[roomId].filter(
          (booking) => booking.documentId !== id
        );
      }

      return { bookingsByRoomId };
    });
  },
}));
