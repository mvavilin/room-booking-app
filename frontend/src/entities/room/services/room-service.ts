import { handleApiError, type Pagination } from '@shared/api';
import {
  roomApi,
  type CreateRoomDto,
  type GetRoomsParameters,
  type RoomDto,
  type UpdateRoomDto,
} from '@entities/room';

export const roomService = {
  async getRooms(parameters?: GetRoomsParameters): Promise<{
    rooms: RoomDto[];
    pagination: Pagination;
  }> {
    try {
      const response = await roomApi.getRooms(parameters);

      return {
        rooms: response.data,
        pagination: response.meta.pagination,
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  async getRoom(documentId: string): Promise<RoomDto> {
    try {
      const response = await roomApi.getRoom(documentId);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async createRoom(room: CreateRoomDto): Promise<RoomDto> {
    try {
      const response = await roomApi.createRoom(room);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async updateRoom(documentId: string, room: UpdateRoomDto): Promise<RoomDto> {
    try {
      const response = await roomApi.updateRoom(documentId, room);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async deleteRoom(documentId: string): Promise<void> {
    try {
      await roomApi.deleteRoom(documentId);
    } catch (error) {
      handleApiError(error);
    }
  },
};
