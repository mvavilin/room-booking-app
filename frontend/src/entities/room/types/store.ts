import type { GetRoomsParameters, RoomDto } from '@entities/room';

export interface RoomStore {
  rooms: RoomDto[];
  currentRoom: RoomDto | undefined;
  loading: boolean;
  error: boolean;

  loadRooms: (parameters: GetRoomsParameters | undefined) => Promise<RoomDto[]>;
  loadRoom(documentId: string): Promise<RoomDto | undefined>;
}
