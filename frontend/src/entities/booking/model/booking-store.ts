// Needs refactoring
import { create } from 'zustand';
import { addSeconds, endOfDay, format, setHours, startOfDay } from 'date-fns';
import {
  bookingService,
  type BookingDto,
  type BookingStore,
  type CreateBookingDto,
  type UpdateBookingDto,
  type BookingConflictResult,
  bookingChannel,
  BookingSyncEvent,
} from '@entities/booking';
import { WEEK_END, WEEK_START } from '@shared/constants';
import { WORKING_DAY_START_HOUR } from '@shared/config/schedule';

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookingsByRoomDocumentId: {},
  weekBookingsByRoomDocumentId: {},
  weekBookingsByRoomDocumentIdLoading: false,
  weekBookingsByRoomDocumentIdError: false,

  isOpenBookingDialog: false,
  bookingDialogMode: 'create',
  activeBooking: undefined,
  startTime: setHours(new Date(), WORKING_DAY_START_HOUR),

  async loadRoomBookings(roomDocumentId): Promise<void> {
    const result = await bookingService.getBookings({
      filters: {
        roomDocumentId: {
          documentId: { $eq: roomDocumentId },
        },
        start: {
          $gte: startOfDay(new Date()),
          $lte: endOfDay(new Date()),
        },
      },
    });

    set((state) => ({
      bookingsByRoomDocumentId: {
        ...state.bookingsByRoomDocumentId,
        [roomDocumentId]: result.data,
      },
    }));
  },

  async createBooking(data: CreateBookingDto): Promise<void> {
    const conflict = await get().checkBookingConflict({
      roomDocumentId: data.roomDocumentId,
      start: data.start,
      finish: data.finish,
    });

    if (conflict.nextAvailableTime)
      throw new Error(
        `Комната занята. Свободно с ${format(data.start, 'HH:mm')} до ${format(
          conflict.nextAvailableTime,
          'HH:mm'
        )}`
      );

    const created: BookingDto = await bookingService.createBooking(data);
    const documentId: string = created.roomDocumentId.documentId;

    set((state) => ({
      bookingsByRoomDocumentId: {
        ...state.bookingsByRoomDocumentId,

        [documentId]: [...(state.bookingsByRoomDocumentId[documentId] ?? []), created],
      },

      weekBookingsByRoomDocumentId: {
        ...state.weekBookingsByRoomDocumentId,
        [documentId]: [...(state.weekBookingsByRoomDocumentId[documentId] ?? []), created],
      },
    }));

    bookingChannel.postMessage({
      type: BookingSyncEvent.Changed,
      roomDocumentId: documentId,
    });
  },

  async updateBooking(documentId: string, data: UpdateBookingDto): Promise<void> {
    const conflict = await get().checkBookingConflict({
      roomDocumentId: data.roomDocumentId,
      start: data.start,
      finish: data.finish,
      bookingDocumentId: documentId,
    });
    if (conflict.isConflict) throw new Error('В выбранном диапазоне времени уже есть бронирование');

    const updated = await bookingService.updateBooking(documentId, data);

    set((state) => {
      const roomBookings = state.bookingsByRoomDocumentId[updated.roomDocumentId.documentId];
      if (roomBookings === undefined) return state;
      const updatedRoomBookings = roomBookings.map((booking) =>
        booking.documentId === documentId ? updated : booking
      );

      const weekBookings = state.weekBookingsByRoomDocumentId[data.roomDocumentId];
      const updatedWeekBookings = weekBookings?.map((booking) =>
        booking.documentId === documentId ? updated : booking
      );

      return {
        bookingsByRoomDocumentId: {
          ...state.bookingsByRoomDocumentId,
          [updated.roomDocumentId.documentId]: updatedRoomBookings,
        },

        weekBookingsByRoomDocumentId: {
          ...state.weekBookingsByRoomDocumentId,
          [data.roomDocumentId]: updatedWeekBookings ?? [],
        },
      };
    });

    bookingChannel.postMessage({
      type: BookingSyncEvent.Changed,
      roomDocumentId: updated.roomDocumentId.documentId,
    });
  },

  async checkBookingConflict(parameters): Promise<BookingConflictResult> {
    const result = await bookingService.getBookings({
      filters: {
        roomDocumentId: {
          documentId: { $eq: parameters.roomDocumentId },
        },
        start: { $lte: parameters.finish },
        finish: { $gte: parameters.start },
        ...(parameters.bookingDocumentId && {
          documentId: {
            $ne: parameters.bookingDocumentId,
          },
        }),
      },
      sort: ['start:asc'],
    });
    const bookings = result.data;

    return bookings[0]
      ? { isConflict: true, nextAvailableTime: addSeconds(new Date(bookings[0].start), 1) }
      : { isConflict: false, nextAvailableTime: undefined };
  },

  async deleteBooking(documentId, room): Promise<void> {
    await bookingService.deleteBooking(documentId);

    set((state) => {
      const roomId = room.documentId;

      return {
        bookingsByRoomDocumentId: {
          ...state.bookingsByRoomDocumentId,
          [roomId]:
            state.bookingsByRoomDocumentId[roomId]?.filter(
              (booking) => booking.documentId !== documentId
            ) ?? [],
        },

        weekBookingsByRoomDocumentId: {
          ...state.weekBookingsByRoomDocumentId,
          [roomId]:
            state.weekBookingsByRoomDocumentId[roomId]?.filter(
              (booking) => booking.documentId !== documentId
            ) ?? [],
        },
      };
    });

    bookingChannel.postMessage({
      type: BookingSyncEvent.Changed,
      roomDocumentId: room.documentId,
    });
  },

  async loadRoomWeekBookings(roomDocumentId): Promise<void> {
    set({ weekBookingsByRoomDocumentIdLoading: true, weekBookingsByRoomDocumentIdError: false });

    try {
      const result = await bookingService.getBookings({
        filters: {
          roomDocumentId: {
            documentId: { $eq: roomDocumentId },
          },
          start: { $gte: WEEK_START, $lte: WEEK_END },
        },
        sort: ['start:asc'],
      });

      set((state) => ({
        weekBookingsByRoomDocumentId: {
          ...state.weekBookingsByRoomDocumentId,
          [roomDocumentId]: result.data,
        },
        weekBookingsByRoomDocumentIdLoading: false,
      }));
    } catch {
      set({ weekBookingsByRoomDocumentIdLoading: false, weekBookingsByRoomDocumentIdError: true });
    }
  },

  openBookingDialog(bookingDialogMode, booking): void {
    set({
      isOpenBookingDialog: true,
      bookingDialogMode,
      activeBooking: booking,
    });
  },

  closeBookingDialog(): void {
    set({
      isOpenBookingDialog: false,
      bookingDialogMode: 'create',
      activeBooking: undefined,
    });
  },

  setStartTime: (date: Date): void => {
    set({ startTime: date });
  },

  clearStartTime: (): void => {
    set({ startTime: setHours(new Date(), WORKING_DAY_START_HOUR) });
  },
}));
