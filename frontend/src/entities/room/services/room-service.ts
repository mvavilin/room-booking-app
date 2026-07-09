import { handleApiError } from '@shared/api';
import {
  roomApi,
  type CreateRoomDto,
  type GetRoomsParameters,
  type UpdateRoomDto,
} from '@entities/room';

export const roomService = {
  async getRooms(parameters?: GetRoomsParameters) {
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

  async getRoom(documentId: string) {
    try {
      const response = await roomApi.getRoom(documentId);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async createRoom(room: CreateRoomDto) {
    try {
      const response = await roomApi.createRoom(room);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async updateRoom(documentId: string, room: UpdateRoomDto) {
    try {
      const response = await roomApi.updateRoom(documentId, room);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async deleteRoom(documentId: string) {
    try {
      await roomApi.deleteRoom(documentId);
    } catch (error) {
      handleApiError(error);
    }
  },
};
