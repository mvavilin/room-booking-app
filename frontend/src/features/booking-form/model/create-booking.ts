import { toast } from 'sonner';
import type { BookingFormValues } from '@features/booking-form';
import { parseFormDateTime, parseFinishTime } from '@features/booking-form';
import type { RoomDto } from '@entities/room';
import type { CreateBookingDto } from '@entities/booking';

interface CreateBookingDependencies {
  activeRoom: RoomDto;
  createBookingFn: (data: CreateBookingDto) => Promise<void>;
  onSuccess: () => void;
}

export async function createBookingAction(
  data: BookingFormValues,
  dependencies: CreateBookingDependencies
): Promise<void> {
  const startDateTime = parseFormDateTime(data.startTime, data.date);
  const finishDateTime = parseFinishTime(data.finishTime, data.date);

  await toast.promise(
    dependencies.createBookingFn({
      roomDocumentId: dependencies.activeRoom.documentId,
      start: startDateTime,
      finish: finishDateTime,
      bookingStatus: 'confirmed',
    }),
    {
      loading: 'Создание бронирования...',
      success: 'Бронирование создано',
      error: (error) =>
        error instanceof Error ? error.message : 'Не удалось создать бронирование',
    }
  );

  dependencies.onSuccess();
}
