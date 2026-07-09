export const roomEndpoints = {
  rooms: '/rooms',

  room: (documentId: string) => `/rooms/${documentId}`,
} as const;
