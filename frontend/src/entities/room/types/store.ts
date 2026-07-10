import type { GetRoomsParameters, RoomDto } from '@entities/room';
import type { Pagination } from '@shared/api';

export interface RoomStore {
  rooms: RoomDto[];
  pagination: Pagination | undefined;

  loadRooms: (parameters?: GetRoomsParameters) => Promise<RoomDto[]>;
}
