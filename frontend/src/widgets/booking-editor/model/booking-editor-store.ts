import { create } from 'zustand';
import type { BookingDialogState } from '@widgets/booking-editor';
import { addSeconds } from 'date-fns';

export const useBookingDialogStore = create<BookingDialogState>((set) => ({
  open: false,
  mode: 'create',
  booking: undefined,
  room: undefined,
  roomNumber: 0,
  start: new Date(),
  finish: new Date(),

  openCreate(room, start, finish): void {
    set({
      open: true,
      mode: 'create',
      booking: undefined,
      room,
      roomNumber: room.roomId,
      start,
      finish,
    });
  },

  openEdit(room, booking): void {
    set({
      open: true,
      mode: 'edit',
      booking,
      room,
      roomNumber: room.roomId,
      start: new Date(booking.start),
      finish: addSeconds(new Date(booking.finish), 1),
    });
  },

  close(): void {
    set({
      open: false,
      booking: undefined,
      room: undefined,
      roomNumber: 0,
      mode: 'create',
    });
  },
}));
