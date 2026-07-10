import { BOOKING_SLOTS } from '@shared/config';
import { TableHead, TableRow } from '@shared/ui';

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

      {BOOKING_SLOTS.map((slot) => (
        <TableHead
          key={slot}
          className="
            text-center
            min-w-20
          "
        >
          {slot}
        </TableHead>
      ))}
    </TableRow>
  );
}
