import { handleApiError } from '@shared/api';
import {
  bookingApi,
  type CreateBookingDto,
  type GetBookingsParameters,
  type UpdateBookingDto,
} from '@entities/booking';

export const bookingService = {
  async getBookings(parameters?: GetBookingsParameters) {
    try {
      const response = await bookingApi.getBookings(parameters);

      return {
        bookings: response.data,
        pagination: response.meta.pagination,
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  async getBooking(documentId: string) {
    try {
      const response = await bookingApi.getBooking(documentId);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async createBooking(booking: CreateBookingDto) {
    try {
      const response = await bookingApi.createBooking(booking);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async updateBooking(documentId: string, booking: UpdateBookingDto) {
    try {
      const response = await bookingApi.updateBooking(documentId, booking);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async deleteBooking(documentId: string) {
    try {
      await bookingApi.deleteBooking(documentId);
    } catch (error) {
      handleApiError(error);
    }
  },
};
