import type { BookingStatus } from '@entities/booking';
import type { StrapiFilter, StrapiQueryParameters } from '@shared/api';

interface BookingFilters {
  roomDocumentId?:
    | StrapiFilter<string>
    | {
        documentId?: StrapiFilter<string>;
      };
  start?: StrapiFilter<Date>;
  finish?: StrapiFilter<Date>;
  status?: StrapiFilter<BookingStatus>;
}

export interface GetBookingsParameters extends Omit<StrapiQueryParameters, 'filters'> {
  filters?: BookingFilters;
}

export interface CreateBookingDto {
  roomDocumentId: string;
  start: Date;
  finish: Date;
  bookingStatus?: BookingStatus;
}

export interface UpdateBookingDto {
  roomDocumentId: string;
  start: Date;
  finish: Date;
  bookingStatus?: BookingStatus;
}
