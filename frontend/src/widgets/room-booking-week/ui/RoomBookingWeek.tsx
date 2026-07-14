import type { RoomDto } from '@entities/room';
import { useRoomBookingWeek } from '@widgets/room-booking-week';
import {
  RoomBookingWeekLoading,
  RoomBookingWeekError,
  RoomBookingWeekTable,
} from '@widgets/room-booking-week/ui';

interface Properties {
  room: RoomDto;
}

export function RoomBookingWeek({ room }: Properties): React.JSX.Element {
  const { bookings, loading, error, reload } = useRoomBookingWeek({
    roomDocumentId: room.documentId,
  });

  if (loading) return <RoomBookingWeekLoading />;

  if (error) return <RoomBookingWeekError onRetry={reload} />;

  return <RoomBookingWeekTable room={room} bookings={bookings} />;
}
