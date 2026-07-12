import { useNavigate } from 'react-router-dom';

import type { RoomDto } from '@entities/room';
import {
  BookingSlotCell,
  findBookingByTime,
  type BookingDto,
  useBookingStore,
} from '@entities/booking';

import { BOOKING_TIME_SLOTS } from '@shared/config';
import { Button, TableCell, TableRow } from '@shared/ui';
import { format } from 'date-fns';

interface BookingRowProperties {
  room: RoomDto;
}

export function BookingRow({ room }: BookingRowProperties): React.JSX.Element {
  const navigate = useNavigate();

  const bookings: BookingDto[] =
    useBookingStore((state) => state.bookingsByRoomDocumentId[room.documentId]) ?? [];

  function handleRoomClick(): void {
    navigate(`/rooms/${room.documentId}`);
  }

  return (
    <TableRow>
      <TableCell className="sticky left-0 z-10 bg-background p-0">
        <Button
          variant="ghost"
          onClick={handleRoomClick}
          className="w-full justify-start px-4 font-medium"
        >
          № {room.roomNumber}
        </Button>
      </TableCell>

      {BOOKING_TIME_SLOTS.map((slot) => (
        <BookingSlotCell
          key={format(slot, 'HH:mm')}
          date={slot}
          room={room}
          booking={findBookingByTime(bookings, slot)}
        />
      ))}
    </TableRow>
  );
}
