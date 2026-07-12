import { BookingTimelineHeader } from '@widgets/booking-timeline/ui';
import { BookingRow } from '@entities/booking';
import { useRoomStore } from '@entities/room';
import { Table, TableBody, TableHeader } from '@shared/ui';

export function BookingTimelineTable(): React.JSX.Element {
  const rooms = useRoomStore((state) => state.rooms);
  // console.log(rooms);

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
