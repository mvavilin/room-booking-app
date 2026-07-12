import type { EntityDto } from '@shared/api';

export interface RoomDto extends EntityDto {
  roomNumber: number;
  capacity: number;
  description: string;
}
