import { toast } from 'sonner';
import { type BookingFormValues, parseFormDateTime, parseFinishTime } from '@features/booking-form';
import type { BookingDto, UpdateBookingDto } from '@entities/booking';
import type { RoomDto } from '@entities/room';

interface UpdateBookingDependencies {
  activeRoom: RoomDto;
  activeBooking: BookingDto;
  updateBookingFn: (documentId: string, data: UpdateBookingDto) => Promise<void>;
  onSuccess: () => void;
}

export async function updateBookingAction(
  data: BookingFormValues,
  dependencies: UpdateBookingDependencies
): Promise<void> {
  const startDateTime = parseFormDateTime(data.startTime, data.date);
  const finishDateTime = parseFinishTime(data.finishTime, data.date);

  const isChanged =
    new Date(dependencies.activeBooking.start).getTime() !== startDateTime.getTime() ||
    new Date(dependencies.activeBooking.finish).getTime() !== finishDateTime.getTime();

  if (!isChanged) {
    toast.info('Изменения отсутствуют');
    return;
  }

  await toast.promise(
    dependencies.updateBookingFn(dependencies.activeBooking.documentId, {
      roomDocumentId: dependencies.activeRoom.documentId,
      start: startDateTime,
      finish: finishDateTime,
    }),
    {
      loading: 'Сохранение изменений...',
      success: 'Бронирование обновлено',
      error: (error) =>
        error instanceof Error ? error.message : 'Не удалось обновить бронирование',
    }
  );

  dependencies.onSuccess();
}
