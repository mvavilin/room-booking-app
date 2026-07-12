import { toast } from 'sonner';
import type { BookingDto } from '@entities/booking';
import type { RoomDto } from '@entities/room';

interface DeleteBookingDependencies {
  activeRoom: RoomDto;
  activeBooking: BookingDto;
  deleteBookingFn: (documentId: string, room: RoomDto) => Promise<void>;
  onSuccess: () => void;
}

export async function deleteBookingAction(dependencies: DeleteBookingDependencies): Promise<void> {
  await toast.promise(
    dependencies.deleteBookingFn(dependencies.activeBooking.documentId, dependencies.activeRoom),
    {
      loading: 'Удаление бронирования...',
      success: 'Бронирование удалено',
      error: 'Не удалось удалить бронирование',
    }
  );

  dependencies.onSuccess();
}
