import type { StrapiFilter, StrapiQueryParameters } from '@shared/api';

interface RoomFilters {
  roomId?: StrapiFilter<number>;
  capacity?: StrapiFilter<number>;
  description?: StrapiFilter<string>;
}

export interface GetRoomsParameters extends Omit<StrapiQueryParameters, 'filters'> {
  filters?: RoomFilters;
}

export interface CreateRoomDto {
  roomId: number;
  capacity: number;
  description: string;
}

export interface UpdateRoomDto {
  roomId?: number;
  capacity?: number;
  description?: string;
}
