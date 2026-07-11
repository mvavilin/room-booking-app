import type { EntityDto } from '@shared/api';
import type { BookingStatus } from '@entities/booking';
import type { RoomDto } from '@entities/room';

export interface BookingDto extends EntityDto {
  roomId: RoomDto;
  start: Date;
  finish: Date;
  status: BookingStatus;
}
