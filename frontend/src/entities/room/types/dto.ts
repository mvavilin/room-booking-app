import type { EntityDto } from '@shared/api';

export interface RoomDto extends EntityDto {
  roomId: number;
  capacity: number;
  description: string;
}
