import type { GetRoomsParameters, RoomDto } from '@entities/room';

export interface RoomStore {
  rooms: RoomDto[];

  activeRoom: RoomDto | undefined;
  activeRoomLoading: boolean;
  activeRoomError: boolean;

  loadRooms: (parameters?: GetRoomsParameters) => Promise<RoomDto[]>;
  loadRoom(documentId: string): Promise<RoomDto | undefined>;
  setActiveRoom: (room: RoomDto) => void;
  clearActiveRoom: () => void;
}
