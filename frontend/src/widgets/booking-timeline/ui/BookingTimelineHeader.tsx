import { TIME_OPTIONS } from '@shared/config';
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

      {TIME_OPTIONS.map((option) => (
        <TableHead
          key={option}
          className="
            text-center
            min-w-20
          "
        >
          {option}
        </TableHead>
      ))}
    </TableRow>
  );
}
