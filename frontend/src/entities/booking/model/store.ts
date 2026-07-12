import { create } from 'zustand';
import {
  bookingService,
  type BookingDto,
  type BookingStore,
  type CreateBookingDto,
  type UpdateBookingDto,
  type BookingConflictResult,
} from '@entities/booking';
import { addSeconds, endOfDay, endOfWeek, format, startOfDay, startOfWeek } from 'date-fns';

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookingsByRoomId: {},
  weekBookingsByRoomId: {},

  weekLoading: false,
  weekError: false,

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
    const conflict = await get().checkBookingConflict(data.roomId, data.start, data.finish);

    if (conflict && conflict.conflict) {
      throw new Error(
        `Комната занята. Свободно с ${format(data.start, 'HH:mm')} до ${format(
          conflict.nextAvailableTime!,
          'HH:mm'
        )}`
      );
    }

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
    const conflict = await get().checkBookingConflict(data.roomId, data.start, data.finish);

    if (conflict && conflict.conflict) {
      throw new Error('В выбранном диапазоне времени уже есть бронирование');
    }

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
        const bookings = bookingsByRoomId[roomId];

        if (bookings === undefined) continue;

        bookingsByRoomId[roomId] = bookings.filter((booking) => booking.documentId !== id);
      }

      return { bookingsByRoomId };
    });
  },

  async checkBookingConflict(
    roomId: number,
    start: Date,
    finish: Date
  ): Promise<BookingConflictResult | undefined> {
    const result = await bookingService.getBookings({
      filters: {
        roomId: {
          $eq: roomId,
        },
        start: {
          $lte: finish,
        },
        finish: {
          $gte: start,
        },
      },
      sort: ['start:asc'],
    });

    const bookings = result.data;

    if (bookings.length === 0) {
      return {
        conflict: false,
        nextAvailableTime: undefined,
      };
    }

    if (bookings[0]) {
      return {
        conflict: true,
        nextAvailableTime: addSeconds(new Date(bookings[0].start), 1),
      };
    }

    return undefined;
  },

  async loadRoomWeekBookings(roomId: number): Promise<void> {
    set({
      weekLoading: true,
      weekError: false,
    });

    try {
      const weekStart = startOfWeek(new Date(), {
        weekStartsOn: 1,
      });

      const weekEnd = endOfWeek(new Date(), {
        weekStartsOn: 1,
      });

      const result = await bookingService.getBookings({
        filters: {
          roomId: {
            $eq: roomId,
          },

          start: {
            $gte: weekStart,
            $lte: weekEnd,
          },
        },

        sort: ['start:asc'],
      });

      set((state) => ({
        weekBookingsByRoomId: {
          ...state.weekBookingsByRoomId,

          [roomId]: result.data,
        },

        weekLoading: false,
      }));
    } catch {
      set({
        weekLoading: false,
        weekError: true,
      });
    }
  },
}));
