import type { BookingDto } from '@entities/booking';
import { TableCell } from '@shared/ui';
import { addMinutes, parse } from 'date-fns';
import { useBookingDialogStore } from '@features/booking-editor';
import type { RoomDto } from '@entities/room';

interface Properties {
  time: string;
  room: RoomDto;
  booking: BookingDto | undefined;
}

export function BookingSlotCell({ time, room, booking }: Properties): React.JSX.Element {
  const openCreate = useBookingDialogStore((state) => state.openCreate);
  const openEdit = useBookingDialogStore((state) => state.openEdit);

  function handleClick(): void {
    if (booking) {
      openEdit(room, booking);
    } else {
      const start = parse(time, 'HH:mm', new Date());
      const finish = addMinutes(start, 30);

      openCreate(room, start, finish);
    }
  }

  return (
    <TableCell className="p-0">
      <button
        onClick={handleClick}
        className={`
          flex
          h-12
          w-full
          items-center
          justify-center
          text-xs
          transition-colors

          ${booking ? 'bg-primary-inverse/20' : 'hover:bg-muted cursor-pointer'}
        `}
      />
    </TableCell>
  );
}
