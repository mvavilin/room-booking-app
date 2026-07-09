import { api, type CollectionResponse, type SingleResponse } from '@shared/api';
import type { RoomDto, CreateRoomDto, UpdateRoomDto, GetRoomsParameters } from '@entities/room';
import { roomEndpoints } from '@entities/room';

export const roomApi = {
  async getRooms(parameters?: GetRoomsParameters) {
    const { data } = await api.get<CollectionResponse<RoomDto>>(roomEndpoints.rooms, {
      params: parameters,
    });

    return data;
  },

  async getRoom(documentId: string) {
    const { data } = await api.get<SingleResponse<RoomDto>>(roomEndpoints.room(documentId));

    return data;
  },

  async createRoom(room: CreateRoomDto) {
    const { data } = await api.post<SingleResponse<RoomDto>>(roomEndpoints.rooms, {
      data: room,
    });

    return data;
  },

  async updateRoom(documentId: string, room: UpdateRoomDto) {
    const { data } = await api.put<SingleResponse<RoomDto>>(roomEndpoints.room(documentId), {
      data: room,
    });

    return data;
  },

  async deleteRoom(documentId: string) {
    await api.delete(roomEndpoints.room(documentId));
  },
};
