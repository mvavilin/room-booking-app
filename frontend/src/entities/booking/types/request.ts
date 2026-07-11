import type { StrapiFilter, StrapiQueryParameters } from '@shared/api';
import type { BookingStatus } from '@entities/booking';

interface BookingFilters {
  bookingId?: StrapiFilter<number>;

  roomId?:
    | StrapiFilter<number>
    | {
        roomId?: StrapiFilter<number>;
      };

  start?: StrapiFilter<Date>;
  finish?: StrapiFilter<Date>;
  status?: StrapiFilter<BookingStatus>;
}

export interface GetBookingsParameters extends Omit<StrapiQueryParameters, 'filters'> {
  filters?: BookingFilters;
}

export interface CreateBookingDto {
  roomId: number;
  start: Date;
  finish: Date;
  bookingStatus: BookingStatus;
}

export interface UpdateBookingDto {
  roomId: number;
  start: Date;
  finish: Date;
  bookingStatus?: BookingStatus;
}
