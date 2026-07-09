import type { CollectionResponse, SingleResponse } from '@shared/api';
import type { BookingDto } from '@entities/booking';

export type BookingsResponse = CollectionResponse<BookingDto>;
export type BookingResponse = SingleResponse<BookingDto>;
