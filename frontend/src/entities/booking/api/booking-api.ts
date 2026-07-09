import { api, type CollectionResponse, type SingleResponse } from '@shared/api';
import type {
  BookingDto,
  CreateBookingDto,
  UpdateBookingDto,
  GetBookingsParameters,
} from '@entities/booking';
import { bookingEndpoints } from '@entities/booking';

export const bookingApi = {
  async getBookings(parameters?: GetBookingsParameters) {
    const { data } = await api.get<CollectionResponse<BookingDto>>(bookingEndpoints.bookings, {
      params: parameters,
    });

    return data;
  },

  async getBooking(documentId: string) {
    const { data } = await api.get<SingleResponse<BookingDto>>(
      bookingEndpoints.booking(documentId)
    );

    return data;
  },

  async createBooking(booking: CreateBookingDto) {
    const { data } = await api.post<SingleResponse<BookingDto>>(bookingEndpoints.bookings, {
      data: booking,
    });

    return data;
  },

  async updateBooking(documentId: string, booking: UpdateBookingDto) {
    const { data } = await api.put<SingleResponse<BookingDto>>(
      bookingEndpoints.booking(documentId),
      {
        data: booking,
      }
    );

    return data;
  },

  async deleteBooking(documentId: string) {
    await api.delete(bookingEndpoints.booking(documentId));
  },
};
