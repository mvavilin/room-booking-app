import { create } from 'zustand';
import { roomService } from '@entities/room';
import type { RoomStore } from '@entities/room';
import type { GetRoomsParameters, RoomDto } from '@entities/room';

const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 10,
} as const;

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  currentRoom: undefined,
  loading: false,
  error: false,

  async loadRooms(parameters: GetRoomsParameters | undefined): Promise<RoomDto[]> {
    const { data } = await roomService.getRooms({
      sort: ['roomId:asc'],
      ...parameters,
      pagination: {
        ...DEFAULT_PAGINATION,
        ...parameters?.pagination,
      },
    });

    set({ rooms: data });

    return data;
  },

  async loadRoom(id: string): Promise<RoomDto | undefined> {
    set({
      loading: true,
      error: false,
    });

    try {
      const room = await roomService.getRoom(id);

      set({
        currentRoom: room,
        loading: false,
      });

      return room;
    } catch {
      set({
        loading: false,
        error: true,
      });

      return undefined;
    }
  },
}));
