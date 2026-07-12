import { api, type CollectionResponse, type SingleResponse } from '@shared/api';
import type {
  BookingDto,
  CreateBookingDto,
  UpdateBookingDto,
  GetBookingsParameters,
} from '@entities/booking';
import { BOOKING_ENDPOINTS } from '@entities/booking';

export const bookingApi = {
  async getBookings(parameters?: GetBookingsParameters): Promise<CollectionResponse<BookingDto>> {
    const { data } = await api.get<CollectionResponse<BookingDto>>(BOOKING_ENDPOINTS.bookings, {
      params: parameters,
    });

    return data;
  },

  async getBooking(documentId: string): Promise<SingleResponse<BookingDto>> {
    const { data } = await api.get<SingleResponse<BookingDto>>(
      BOOKING_ENDPOINTS.booking(documentId)
    );

    return data;
  },

  async createBooking(booking: CreateBookingDto): Promise<SingleResponse<BookingDto>> {
    const { data } = await api.post<SingleResponse<BookingDto>>(
      BOOKING_ENDPOINTS.bookings,
      { data: booking },
      { params: { populate: '*' } }
    );

    return data;
  },

  async updateBooking(
    documentId: string,
    booking: UpdateBookingDto
  ): Promise<SingleResponse<BookingDto>> {
    const { data } = await api.put<SingleResponse<BookingDto>>(
      BOOKING_ENDPOINTS.booking(documentId),
      { data: booking },
      { params: { populate: '*' } }
    );

    return data;
  },

  async deleteBooking(documentId: string): Promise<void> {
    await api.delete(BOOKING_ENDPOINTS.booking(documentId));
  },
};
