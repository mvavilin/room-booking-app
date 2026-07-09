import type { CollectionResponse, SingleResponse } from '@shared/api';
import type { RoomDto } from '@entities/room';

export type RoomsResponse = CollectionResponse<RoomDto>;
export type RoomResponse = SingleResponse<RoomDto>;
