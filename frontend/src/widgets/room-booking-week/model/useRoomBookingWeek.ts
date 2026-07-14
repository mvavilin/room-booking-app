import { useCallback, useEffect } from 'react';

import { useBookingStore, useBookingSync, type BookingDto } from '@entities/booking';

interface Properties {
  roomDocumentId: string;
}

interface Return {
  bookings: BookingDto[] | undefined;
  loading: boolean;
  error: boolean;
  reload: () => Promise<void>;
}

export function useRoomBookingWeek({ roomDocumentId }: Properties): Return {
  const bookings = useBookingStore((state) => state.weekBookingsByRoomDocumentId[roomDocumentId]);

  const loading = useBookingStore((state) => state.weekBookingsByRoomDocumentIdLoading);

  const error = useBookingStore((state) => state.weekBookingsByRoomDocumentIdError);

  const loadRoomWeekBookings = useBookingStore((state) => state.loadRoomWeekBookings);

  const reload = useCallback(async () => {
    await loadRoomWeekBookings(roomDocumentId);
  }, [loadRoomWeekBookings, roomDocumentId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useBookingSync({
    roomDocumentId,
    onChanged: reload,
  });

  return {
    bookings,
    loading,
    error,
    reload,
  };
}
