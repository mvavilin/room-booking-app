import { Loader2 } from 'lucide-react';

export function RoomBookingWeekLoading(): React.JSX.Element {
  return (
    <div className="flex h-64 items-center justify-center gap-2">
      <Loader2 className="size-5 animate-spin" />
      Загрузка бронирований...
    </div>
  );
}
