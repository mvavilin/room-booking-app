import { useEffect, useMemo } from 'react';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Loader2, CalendarX2 } from 'lucide-react';

import type { RoomDto } from '@entities/room';
import {
  useBookingStore,
  selectWeekBookingsByRoom,
  findBookingByDateTime,
} from '@entities/booking';

import { TIME_OPTIONS } from '@shared/config';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui';

import { BookingSlotCell } from '@widgets/booking-timeline';

interface Properties {
  room: RoomDto;
}

export function RoomBookingWeek({ room }: Properties): React.JSX.Element {
  const bookings = useBookingStore(selectWeekBookingsByRoom(room.id));

  const loading = useBookingStore((state) => state.weekLoading);

  const error = useBookingStore((state) => state.weekError);

  const loadRoomWeekBookings = useBookingStore((state) => state.loadRoomWeekBookings);

  const weekStart = useMemo(
    () =>
      startOfWeek(new Date(), {
        weekStartsOn: 1,
      }),
    []
  );

  const weekDays = useMemo(
    () =>
      eachDayOfInterval({
        start: weekStart,
        end: endOfWeek(weekStart, {
          weekStartsOn: 1,
        }),
      }),
    [weekStart]
  );

  useEffect(() => {
    void loadRoomWeekBookings(room.id);
  }, [room.id, weekStart, loadRoomWeekBookings]);

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
      <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-lg border">
        <CalendarX2 className="size-10 text-muted-foreground" />

        <p>Не удалось загрузить бронирования.</p>

        <Button variant="outline" onClick={() => loadRoomWeekBookings(room.id)}>
          Повторить
        </Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Время</TableHead>

          {weekDays.map((day) => (
            <TableHead key={day.toISOString()} className="text-center">
              <div>
                {format(day, 'EEEE', {
                  locale: ru,
                })}
              </div>

              <div className="text-xs text-muted-foreground">{format(day, 'dd.MM')}</div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {TIME_OPTIONS.map((time) => (
          <TableRow key={time}>
            <TableCell className="font-medium">{time}</TableCell>

            {weekDays.map((day) => (
              <BookingSlotCell
                key={`${day.toISOString()}-${time}`}
                room={room}
                date={day}
                time={time}
                booking={findBookingByDateTime(bookings, day, time)}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
