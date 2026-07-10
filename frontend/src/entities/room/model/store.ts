import { create } from 'zustand';
import { roomService } from '@entities/room';
import type { RoomStore, GetRoomsParameters } from '@entities/room';

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  pagination: undefined,
  currentRoom: undefined,

  async getRooms(parameters?: GetRoomsParameters): Promise<void> {
    const { data, pagination } = await roomService.getRooms(parameters);

    set({
      rooms: data,
      pagination,
    });
  },

  async getRoom(documentId: string): Promise<void> {
    const room = await roomService.getRoom(documentId);

    set({
      currentRoom: room,
    });
  },

  async createRoom(room): Promise<void> {
    const createdRoom = await roomService.createRoom(room);

    set((state) => ({
      rooms: [...state.rooms, createdRoom],
    }));
  },

  async updateRoom(documentId, room): Promise<void> {
    const updatedRoom = await roomService.updateRoom(documentId, room);

    set((state) => ({
      rooms: state.rooms.map((item) => (item.documentId === documentId ? updatedRoom : item)),
    }));
  },

  async deleteRoom(documentId: string): Promise<void> {
    await roomService.deleteRoom(documentId);

    set((state) => ({
      rooms: state.rooms.filter((item) => item.documentId !== documentId),
    }));
  },
}));
