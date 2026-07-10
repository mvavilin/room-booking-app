import { useEffect, useState } from 'react';
import { useRoomStore, type RoomDto } from '@entities/room';
import { useBookingStore } from '@entities/booking';

export function useLoadBookingTimeline(): {
  isLoading: boolean;
} {
  const getRooms = useRoomStore((state) => state.loadRooms);

  const loadRoomBookings = useBookingStore((state) => state.loadRoomBookings);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        setIsLoading(true);

        const rooms = await getRooms();

        await Promise.all(rooms.map((room: RoomDto) => loadRoomBookings(room.id)));
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, [getRooms, loadRoomBookings]);

  return {
    isLoading,
  };
}
