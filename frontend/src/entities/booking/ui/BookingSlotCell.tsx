import { useRoomStore, type RoomDto } from '@entities/room';
import { useBookingStore, type BookingDto } from '@entities/booking';
import { Button, TableCell } from '@shared/ui';

interface Properties {
  date: Date;
  room: RoomDto;
  booking: BookingDto | undefined;
}

export function BookingSlotCell({ date, room, booking }: Properties): React.JSX.Element {
  const openBookingDialog = useBookingStore((state) => state.openBookingDialog);
  const setStartTime = useBookingStore((state) => state.setStartTime);
  const setActiveRoom = useRoomStore((state) => state.setActiveRoom);

  function handleClick(): void {
    setActiveRoom(room);
    setStartTime(date);

    if (booking) {
      openBookingDialog('edit', booking);
      return;
    }

    openBookingDialog('create');
  }

  return (
    <TableCell className="p-0">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={`
          flex
          h-12
          w-full
          rounded-none
          text-xs
          transition-colors
          border-0

          ${booking ? 'bg-selection-foreground/20 hover:bg-selection-foreground/30' : 'hover:bg-muted'}
        `}
      />
    </TableCell>
  );
}
