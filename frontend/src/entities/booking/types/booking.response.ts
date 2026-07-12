import type { BookingDto } from '@entities/booking';
import type { CollectionResponse, SingleResponse } from '@shared/api';

export type BookingsResponse = CollectionResponse<BookingDto>;
export type BookingResponse = SingleResponse<BookingDto>;
