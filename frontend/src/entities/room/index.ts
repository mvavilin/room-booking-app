export { roomApi } from '@entities/room/api/room-api';
export { roomEndpoints } from '@entities/room/api/room-endpoints';

export { roomService } from '@entities/room/services/room-service';

export type { RoomDto } from '@entities/room/types/room-dto';
export type { Room } from '@entities/room/types/room';
export type {
  CreateRoomDto,
  UpdateRoomDto,
  GetRoomsParameters,
} from '@entities/room/types/room-request';
export type { RoomsResponse, RoomResponse } from '@entities/room/types/room-response';
