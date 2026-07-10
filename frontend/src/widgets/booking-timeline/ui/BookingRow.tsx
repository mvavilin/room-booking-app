import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { isWithinInterval, parse } from 'date-fns';
import { type BookingDto, bookingService, useBookingStore } from '@entities/booking';
import type { RoomDto } from '@entities/room';
import { BOOKING_SLOTS } from '@shared/config';
import { TableCell, TableRow } from '@shared/ui';

// TODO: Refactor

export function BookingRow({ room }: { room: RoomDto }): React.JSX.Element {
  const [bookings, setBookings] = useState<BookingDto[]>([]);

  const bookingVersion = useBookingStore((state) => state.bookingVersion);

  const loadBookings = useCallback(async (): Promise<void> => {
    const result = await bookingService.getBookings({
      filters: {
        roomId: { $eq: room.id },
      },
    });

    setBookings(result.data);
  }, [room.id]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadBookings();
    });
  }, [loadBookings, bookingVersion]);

  const handleRoomClick = (): void => {
    toast.success(`Комната №${room.roomId}`);
  };

  const handleTimeClick = (time: string): void => {
    toast.success(`Комната №${room.roomId}, ${time}`);
  };

  return (
    <TableRow>
      <TableCell key={room.id} className="sticky left-0 z-10 bg-background p-0">
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
          "
        >
          № {room.roomId}
        </button>
      </TableCell>

      {BOOKING_SLOTS.map((time) => {
        const booking = bookings.find((item) => {
          const slot = parse(time, 'HH:mm', item.start);

          return isWithinInterval(slot, {
            start: item.start,
            end: item.finish,
          });
        });

        return (
          <TableCell key={time} className="p-0">
            <button
              onClick={() => handleTimeClick(time)}
              className={`
                flex
                h-12
                w-full
                items-center
                justify-center
                text-xs
                transition-colors

                ${booking ? 'bg-primary-inverse/20 hover:bg-primary-inverse/30' : 'hover:bg-muted'}
              `}
            ></button>
          </TableCell>
        );
      })}
    </TableRow>
  );
}
