export type BookingStatus = 'confirmed' | 'canceled';

export interface Booking {
  id: number;
  roomId: number;
  start: Date;
  finish: Date;
  status: BookingStatus;
}
