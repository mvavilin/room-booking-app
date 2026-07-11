import type { EntityDto } from '@shared/api';
import type { BookingStatus } from '@entities/booking';
import type { RoomDto } from '@entities/room';

export interface BookingDto extends EntityDto {
  bookingId: number;
  roomId: RoomDto;
  start: Date;
  finish: Date;
  status: BookingStatus;
}
