export const BOOKING_ENDPOINTS = {
  bookings: '/bookings',
  booking: (documentId: string) => `/bookings/${documentId}`,
} as const;
