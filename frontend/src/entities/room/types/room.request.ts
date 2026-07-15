import type { StrapiFilter, StrapiQueryParameters } from '@shared/api';

interface RoomFilters {
  roomNumber?: StrapiFilter<number>;
  capacity?: StrapiFilter<number>;
  description?: StrapiFilter<string>;
}

export interface GetRoomsParameters extends Omit<StrapiQueryParameters, 'filters'> {
  filters?: RoomFilters;
}

export interface CreateRoomDto {
  roomNumber: number;
  capacity: number;
  description?: string;
}

export interface UpdateRoomDto {
  roomNumber?: number;
  capacity?: number;
  description?: string;
}
