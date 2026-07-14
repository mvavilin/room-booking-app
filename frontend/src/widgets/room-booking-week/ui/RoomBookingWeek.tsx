// Needs refactoring
import { useEffect, useMemo } from 'react';
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  startOfWeek,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { Loader2, CalendarX2 } from 'lucide-react';
import type { RoomDto } from '@entities/room';
import {
  useBookingStore,
  findBookingByTime,
  BookingSlotCell,
  type BookingStore,
  useBookingSync,
} from '@entities/booking';
import { BOOKING_TIME_SLOTS } from '@shared/config';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui';
import { Header } from '@/widgets/header';

interface RoomBookingWeekProperties {
  room: RoomDto;
}

export function RoomBookingWeek({ room }: RoomBookingWeekProperties): React.JSX.Element {
  const bookings = useBookingStore(
    (state: BookingStore) => state.weekBookingsByRoomDocumentId[room.documentId]
  );
  const loading = useBookingStore((state) => state.weekBookingsByRoomDocumentIdLoading);
  const error = useBookingStore((state) => state.weekBookingsByRoomDocumentIdError);
  const loadRoomWeekBookings = useBookingStore((state) => state.loadRoomWeekBookings);

  const weekStart = useMemo(() => startOfWeek(new Date(), { weekStartsOn: 1 }), []);
  const weekDays = useMemo(
    () =>
      eachDayOfInterval({
        start: weekStart,
        end: endOfWeek(weekStart, { weekStartsOn: 1 }),
      }),
    [weekStart]
  );

  useEffect(() => {
    if (room) {
      void loadRoomWeekBookings(room.documentId);
    }
  }, [room, weekStart, loadRoomWeekBookings]);

  useBookingSync({
    roomDocumentId: room.documentId,
    onChanged: async () => {
      await loadRoomWeekBookings(room.documentId);
    },
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2">
        <Loader2 className="size-5 animate-spin" />
        Загрузка бронирований...
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Header />

        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-lg border">
          <CalendarX2 className="size-10 text-muted-foreground" />
          <p>Не удалось загрузить бронирования.</p>
          <Button
            variant="outline"
            onClick={() => {
              if (room) loadRoomWeekBookings(room.documentId);
            }}
          >
            Повторить
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 sticky left-0 bg-background z-10">Время</TableHead>
            {weekDays.map((day) => (
              <TableHead key={day.toISOString()} className="text-center min-w-25">
                <div>{format(day, 'EEEE', { locale: ru })}</div>
                <div className="text-xs text-muted-foreground">{format(day, 'dd.MM')}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {BOOKING_TIME_SLOTS.map((slot) => (
            <TableRow key={format(slot, 'HH:mm')}>
              <TableCell className="font-medium sticky left-0 bg-background">
                {format(slot, 'HH:mm')}
              </TableCell>
              {weekDays.map((day) => {
                const dateTime = setMinutes(setHours(day, getHours(slot)), getMinutes(slot));
                const booking = bookings ? findBookingByTime(bookings, dateTime) : undefined;
                return (
                  <BookingSlotCell
                    key={`${day.toISOString()}-${format(slot, 'HH:mm')}`}
                    room={room}
                    date={dateTime}
                    booking={booking}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
