import { useEffect } from 'react';

import { bookingChannel, BookingSyncEvent, type BookingChangedPayload } from '@entities/booking';

interface UseBookingSyncParameters {
  roomDocumentId?: string;
  onChanged: () => Promise<void> | void;
}

export function useBookingSync({ roomDocumentId, onChanged }: UseBookingSyncParameters): void {
  useEffect(() => {
    const handler = async (event: MessageEvent<BookingChangedPayload>): Promise<void> => {
      if (event.data.type !== BookingSyncEvent.Changed) {
        return;
      }

      if (roomDocumentId && event.data.roomDocumentId !== roomDocumentId) {
        return;
      }

      await onChanged();
    };

    bookingChannel.addEventListener('message', handler);

    return (): void => {
      bookingChannel.removeEventListener('message', handler);
    };
  }, [roomDocumentId, onChanged]);
}
