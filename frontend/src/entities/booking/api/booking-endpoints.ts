export const bookingEndpoints = {
  bookings: '/bookings',

  booking: (documentId: string) => `/bookings/${documentId}`,
} as const;
