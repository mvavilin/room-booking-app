import { Card, Spinner, TypographyH3 } from '@shared/ui';
import { BookingTimelineTable } from '@widgets/booking-timeline';
import { useLoadBookingTimeline } from '@widgets/booking-timeline';

export function BookingTimeline(): React.JSX.Element {
  const { isLoading } = useLoadBookingTimeline();

  if (isLoading) return <Spinner className="size-8" />;

  return (
    <Card className="w-full rounded-xl shadow-sm p-6">
      <TypographyH3>Расписание</TypographyH3>

      <div className="overflow-x-auto">
        <BookingTimelineTable />
      </div>
    </Card>
  );
}
