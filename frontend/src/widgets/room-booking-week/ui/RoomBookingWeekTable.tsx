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

import type { RoomDto } from '@entities/room';

import { findBookingByTime, BookingSlotCell, type BookingDto } from '@entities/booking';

import { BOOKING_TIME_SLOTS } from '@shared/config';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui';

interface Properties {
  room: RoomDto;
  bookings: BookingDto[] | undefined;
}

export function RoomBookingWeekTable({ room, bookings = [] }: Properties): React.JSX.Element {
  const weekStart = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });

  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, {
      weekStartsOn: 1,
    }),
  });

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 sticky left-0 bg-background z-10">Время</TableHead>

            {weekDays.map((day) => (
              <TableHead key={day.toISOString()} className="text-center min-w-25">
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
          {BOOKING_TIME_SLOTS.map((slot) => (
            <TableRow key={format(slot, 'HH:mm')}>
              <TableCell className="font-medium sticky left-0 bg-background">
                {format(slot, 'HH:mm')}
              </TableCell>

              {weekDays.map((day) => {
                const dateTime = setMinutes(setHours(day, getHours(slot)), getMinutes(slot));

                return (
                  <BookingSlotCell
                    key={`${day.toISOString()}-${format(slot, 'HH:mm')}`}

                    room={room}

                    date={dateTime}

                    booking={findBookingByTime(bookings, dateTime)}
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
