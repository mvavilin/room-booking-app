import { useEffect, useState } from 'react';

import { useRoomStore, type RoomDto } from '@entities/room';
import { useBookingStore } from '@entities/booking';

export function useLoadBookingTimeline(): { isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(true);
  const loadRooms = useRoomStore((state) => state.loadRooms);
  const loadRoomBookings = useBookingStore((state) => state.loadRoomBookings);

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        setIsLoading(true);

        const rooms = await loadRooms();

        await Promise.all(rooms.map((room: RoomDto) => loadRoomBookings(room)));
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, [loadRooms, loadRoomBookings]);

  return { isLoading };
}
