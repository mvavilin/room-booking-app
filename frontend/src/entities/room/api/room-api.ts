import { api, type CollectionResponse, type SingleResponse } from '@shared/api';
import type { RoomDto, CreateRoomDto, UpdateRoomDto, GetRoomsParameters } from '@entities/room';
import { ROOM_ENDPOINTS } from '@entities/room';

export const roomApi = {
  async getRooms(parameters?: GetRoomsParameters): Promise<CollectionResponse<RoomDto>> {
    const { data } = await api.get<CollectionResponse<RoomDto>>(ROOM_ENDPOINTS.rooms, {
      params: parameters,
    });

    return data;
  },

  async getRoom(documentId: string): Promise<SingleResponse<RoomDto>> {
    const { data } = await api.get<SingleResponse<RoomDto>>(ROOM_ENDPOINTS.room(documentId));

    return data;
  },

  async createRoom(room: CreateRoomDto): Promise<SingleResponse<RoomDto>> {
    const { data } = await api.post<SingleResponse<RoomDto>>(ROOM_ENDPOINTS.rooms, { data: room });

    return data;
  },

  async updateRoom(documentId: string, room: UpdateRoomDto): Promise<SingleResponse<RoomDto>> {
    const { data } = await api.put<SingleResponse<RoomDto>>(ROOM_ENDPOINTS.room(documentId), {
      data: room,
    });

    return data;
  },

  async deleteRoom(documentId: string): Promise<void> {
    await api.delete(ROOM_ENDPOINTS.room(documentId));
  },
};
