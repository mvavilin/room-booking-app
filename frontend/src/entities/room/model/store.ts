import { create } from 'zustand';
import { roomService } from '@entities/room';
import type { RoomDto, RoomStore } from '@entities/room';

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  pagination: undefined,

  async loadRooms(): Promise<RoomDto[]> {
    const { data, pagination } = await roomService.getRooms({
      pagination: {
        page: 1,
        pageSize: 10,
      },
      sort: ['roomId:asc'],
    });

    set({
      rooms: data,
      pagination,
    });

    return data;
  },
}));
