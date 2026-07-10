import { toast } from 'sonner';
import type { RoomDto } from '@entities/room';
import { selectBookingsByRoom, useBookingStore } from '@entities/booking';
import { BOOKING_SLOTS } from '@shared/config';
import { TableCell, TableRow } from '@shared/ui';

import { BookingSlotCell } from '@widgets/booking-timeline';
import { findBookingByTime } from '@widgets/booking-timeline';

interface Properties {
  room: RoomDto;
}

export function BookingRow({ room }: Properties): React.JSX.Element {
  const bookings = useBookingStore(selectBookingsByRoom(room.id));

  function handleRoomClick(): void {
    toast.success(`Комната №${room.roomId}`);
  }

  return (
    <TableRow>
      <TableCell
        className="
          sticky
          left-0
          z-10
          bg-background
          p-0
        "
      >
        <button
          onClick={handleRoomClick}
          className="
            flex
            h-12
            w-full
            items-center
            px-4
            font-medium
            transition-colors
            hover:bg-muted
            cursor-pointer
          "
        >
          № {room.roomId}
        </button>
      </TableCell>

      {BOOKING_SLOTS.map((time) => (
        <BookingSlotCell
          key={time}
          time={time}
          roomId={room.roomId}
          booking={findBookingByTime(bookings, time)}
        />
      ))}
    </TableRow>
  );
}
