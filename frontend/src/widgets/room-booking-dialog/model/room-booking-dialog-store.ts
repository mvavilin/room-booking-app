import { create } from 'zustand';
import type { RoomDto } from '@entities/room';

interface RoomBookingDialogState {
  open: boolean;
  room: RoomDto | undefined;

  openDialog: (room: RoomDto) => void;
  closeDialog: () => void;
}

export const useRoomBookingDialogStore = create<RoomBookingDialogState>((set) => ({
  open: false,
  room: undefined,

  openDialog: (room: RoomDto): void =>
    set({
      open: true,
      room,
    }),

  closeDialog: (): void =>
    set({
      open: false,
      room: undefined,
    }),
}));
