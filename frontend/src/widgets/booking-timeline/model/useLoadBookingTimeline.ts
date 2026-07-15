import { useCallback, useEffect, useState } from 'react';

import { useRoomStore, type RoomDto } from '@entities/room';
import { useBookingStore, useBookingSync } from '@entities/booking';

export function useLoadBookingTimeline(): { isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(true);

  const loadRooms = useRoomStore((state) => state.loadRooms);
  const loadRoomBookings = useBookingStore((state) => state.loadRoomBookings);

  const reload = useCallback(async (): Promise<void> => {
    const rooms = await loadRooms();

    await Promise.all(rooms.map((room: RoomDto) => loadRoomBookings(room.documentId)));
  }, [loadRooms, loadRoomBookings]);

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        setIsLoading(true);
        await reload();
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, [reload]);

  useBookingSync({ onChanged: reload });

  return { isLoading };
}
