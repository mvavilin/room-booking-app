import { BookingRow } from '@widgets/booking-timeline';
import { useRoomStore } from '@entities/room';
import { BOOKING_SLOTS } from '@shared/config';
import { Card, Table, TableBody, TableHead, TableHeader, TableRow, TypographyH3 } from '@shared/ui';
import { useEffect } from 'react';

export function BookingTimeline(): React.JSX.Element {
  const rooms = useRoomStore((state) => state.rooms);
  const getRooms = useRoomStore((state) => state.getRooms);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <Card className="w-full rounded-xl shadow-sm p-6">
      <TypographyH3>Расписание</TypographyH3>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background z-10 w-48">Комната</TableHead>

              {BOOKING_SLOTS.map((slot) => (
                <TableHead key={slot} className="text-center min-w-20">
                  {slot}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rooms.map((room) => (
              <BookingRow key={room.documentId} room={room} />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
