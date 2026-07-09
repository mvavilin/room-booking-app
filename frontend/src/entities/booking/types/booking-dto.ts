import type { EntityDto } from '@shared/api';
import type { BookingStatus } from '@entities/booking';

export interface BookingDto extends EntityDto {
  bookingId: number;
  roomId: number;
  start: Date;
  finish: Date;
  status: BookingStatus;
}
