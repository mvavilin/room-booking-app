import { BOOKING_TIME_SLOTS } from '@shared/config';
import { TableHead, TableRow } from '@shared/ui';
import { format } from 'date-fns';

export function BookingTimelineHeader(): React.JSX.Element {
  return (
    <TableRow>
      <TableHead
        className="
          sticky
          left-0
          bg-background
          z-10
          w-48
        "
      >
        Комната
      </TableHead>

      {BOOKING_TIME_SLOTS.map((slot) => (
        <TableHead
          key={format(slot, 'HH:mm')}
          className="
            text-center
            min-w-20
          "
        >
          {format(slot, 'HH:mm')}
        </TableHead>
      ))}
    </TableRow>
  );
}
