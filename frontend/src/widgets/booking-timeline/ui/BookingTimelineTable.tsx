import { BookingRow } from '@widgets/booking-timeline';
import { useRoomStore } from '@entities/room';
import { Table, TableBody, TableHeader } from '@shared/ui';
import { BookingTimelineHeader } from '@widgets/booking-timeline';

export function BookingTimelineTable(): React.JSX.Element {
  const rooms = useRoomStore((state) => state.rooms);

  return (
    <Table>
      <TableHeader>
        <BookingTimelineHeader />
      </TableHeader>

      <TableBody>
        {rooms.map((room) => (
          <BookingRow key={room.documentId} room={room} />
        ))}
      </TableBody>
    </Table>
  );
}
