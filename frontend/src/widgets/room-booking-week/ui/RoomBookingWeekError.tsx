import { CalendarX2 } from 'lucide-react';

import { Button } from '@shared/ui';

interface Properties {
  onRetry(): void;
}

export function RoomBookingWeekError({ onRetry }: Properties): React.JSX.Element {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-lg border">
      <CalendarX2 className="size-10 text-muted-foreground" />

      <p>Не удалось загрузить бронирования.</p>

      <Button variant="outline" onClick={onRetry}>
        Повторить
      </Button>
    </div>
  );
}
