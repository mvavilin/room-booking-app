import { Card, Spinner, TypographyH3 } from '@shared/ui';
import { BookingTimelineTable } from '@widgets/booking-timeline/ui';
import { useLoadBookingTimeline } from '@widgets/booking-timeline';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function BookingTimeline(): React.JSX.Element {
  const { isLoading } = useLoadBookingTimeline();

  if (isLoading) return <Spinner className="size-8" />;

  return (
    <Card className="w-full rounded-xl shadow-sm p-6">
      <div className="mb-4 flex items-center justify-between">
        <TypographyH3>Расписание</TypographyH3>

        <span className="text-sm text-muted-foreground">
          {format(new Date(), 'd MMMM, EEEE', { locale: ru })}
        </span>
      </div>

      <div className="overflow-x-auto">
        <BookingTimelineTable />
      </div>
    </Card>
  );
}
