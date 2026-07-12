import type { RoomDto } from '@entities/room';
import type { EntityDto } from '@shared/api';

export type BookingStatus = 'confirmed' | 'canceled';

export interface BookingDto extends EntityDto {
  roomDocumentId: RoomDto;
  start: Date;
  finish: Date;
  status: BookingStatus;
}
