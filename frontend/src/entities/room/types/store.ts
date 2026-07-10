import type { CreateRoomDto, GetRoomsParameters, RoomDto, UpdateRoomDto } from '@entities/room';
import type { Pagination } from '@shared/api';

export interface RoomStore {
  rooms: RoomDto[];
  pagination: Pagination | undefined;
  currentRoom: RoomDto | undefined;

  getRooms: (parameters?: GetRoomsParameters) => Promise<void>;

  getRoom: (documentId: string) => Promise<void>;

  createRoom: (room: CreateRoomDto) => Promise<void>;

  updateRoom: (documentId: string, room: UpdateRoomDto) => Promise<void>;

  deleteRoom: (documentId: string) => Promise<void>;
}
