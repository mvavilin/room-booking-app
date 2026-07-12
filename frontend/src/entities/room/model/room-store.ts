import { create } from 'zustand';
import { roomService } from '@entities/room';
import type { GetRoomsParameters, RoomDto, RoomStore } from '@entities/room';
import { DEFAULT_PAGINATION } from '@shared/constants';

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],

  activeRoom: undefined,
  activeRoomLoading: false,
  activeRoomError: false,

  async loadRooms(parameters?: GetRoomsParameters): Promise<RoomDto[]> {
    const { data } = await roomService.getRooms({
      ...parameters,
      pagination: {
        ...DEFAULT_PAGINATION,
        ...parameters?.pagination,
      },
      sort: ['roomNumber:asc'],
    });

    set({ rooms: data });

    return data;
  },

  async loadRoom(documentId: string): Promise<RoomDto | undefined> {
    set({ activeRoomLoading: true, activeRoomError: false });

    try {
      const room = await roomService.getRoom(documentId);

      set({ activeRoom: room, activeRoomLoading: false });

      return room;
    } catch {
      set({ activeRoomLoading: false, activeRoomError: true });

      return undefined;
    }
  },

  setActiveRoom: (room: RoomDto): void => {
    set({
      activeRoom: room,
      activeRoomLoading: false,
      activeRoomError: false,
    });
  },

  clearActiveRoom: (): void => {
    set({
      activeRoom: undefined,
      activeRoomLoading: false,
      activeRoomError: false,
    });
  },
}));
