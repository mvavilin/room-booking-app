import type { RoomDto } from '@entities/room';
import type { BookingDto } from '@entities/booking';

export type BookingDialogMode = 'create' | 'edit';

export interface BookingDialogState {
  open: boolean;
  mode: BookingDialogMode;
  booking: BookingDto | undefined;
  room: RoomDto | undefined;
  roomNumber: number;
  start: Date;
  finish: Date;

  openCreate(room: RoomDto, start: Date, finish: Date): void;
  openEdit(room: RoomDto, booking: BookingDto): void;
  close(): void;
}
