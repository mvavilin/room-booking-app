import { toast } from 'sonner';
import type { BookingDto } from '@entities/booking';
import { TableCell } from '@shared/ui';

interface Properties {
  time: string;
  booking: BookingDto | undefined;
  roomId: number;
}

export function BookingSlotCell({ time, booking, roomId }: Properties): React.JSX.Element {
  function handleClick(): void {
    if (booking) {
      toast.warning(`Комната №${roomId}, ${time} занята`);

      return;
    }

    toast.success(`Комната №${roomId}, ${time} свободна`);
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
