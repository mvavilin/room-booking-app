export const ROOM_ENDPOINTS = {
  rooms: '/rooms',
  room: (documentId: string) => `/rooms/${documentId}`,
} as const;
