export enum BookingSyncEvent {
  Changed = 'BOOKING_CHANGED',
}

export interface BookingChangedPayload {
  type: BookingSyncEvent.Changed;
  roomDocumentId: string;
}
