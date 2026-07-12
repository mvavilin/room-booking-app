// import { toast } from 'sonner';
import type { RoomDto } from '@entities/room';
import { selectBookingsByRoom, useBookingStore } from '@entities/booking';
import { TIME_OPTIONS } from '@shared/config';
import { TableCell, TableRow } from '@shared/ui';

import { BookingSlotCell } from '@widgets/booking-timeline';
import { findBookingByTime } from '@widgets/booking-timeline';
// import { useBookingDialogStore } from '@/widgets/booking-editor';
// import { useRoomBookingDialogStore } from '@widgets/room-booking-dialog/model/room-booking-dialog-store';
import { useNavigate } from 'react-router-dom';
import { startOfDay } from 'date-fns';

interface Properties {
  room: RoomDto;
}

export function BookingRow({ room }: Properties): React.JSX.Element {
  const navigate = useNavigate();
  const bookings = useBookingStore(selectBookingsByRoom(room.id));

  // const openRoomDialog = useRoomBookingDialogStore((state) => state.openDialog);

  function handleRoomClick(): void {
    navigate(`/rooms/${room.documentId}`);
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

      {TIME_OPTIONS.map((time) => (
        <BookingSlotCell
          key={time}
          date={startOfDay(new Date())}
          time={time}
          room={room}
          booking={findBookingByTime(bookings, time)}
        />
      ))}
    </TableRow>
  );
}
