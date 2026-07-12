import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bookingSchema,
  type BookingFormValues,
  BookingFormFields,
  BookingFormActions,
  useBookingDialogStore,
} from '@widgets/booking-editor';
import { parse, subSeconds, format } from 'date-fns';
import { toast } from 'sonner';
import { useBookingStore } from '@entities/booking';

export function BookingForm(): React.JSX.Element {
  const { close, mode, room, start, finish, booking } = useBookingDialogStore();

  const createBooking = useBookingStore((state) => state.createBooking);

  const updateBooking = useBookingStore((state) => state.updateBooking);

  const deleteBooking = useBookingStore((state) => state.deleteBooking);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      date: new Date(),
      startTime: format(start, 'HH:mm'),
      finishTime: format(finish, 'HH:mm'),
    },
  });

  const submit = async (data: BookingFormValues): Promise<void> => {
    if (!room) {
      return;
    }

    const start = parse(data.startTime, 'HH:mm', data.date);

    const finish = subSeconds(parse(data.finishTime, 'HH:mm', data.date), 1);

    if (mode === 'create') {
      await toast.promise(
        createBooking({
          roomId: room.id,
          start,
          finish,
          bookingStatus: 'confirmed',
        }),
        {
          loading: 'Создание бронирования...',
          success: 'Бронирование создано',
          error: (error) =>
            error instanceof Error ? error.message : 'Не удалось создать бронирование',
        }
      );

      close();
      return;
    }

    if (mode === 'edit' && booking) {
      const isChanged =
        new Date(booking.start).getTime() !== start.getTime() ||
        new Date(booking.finish).getTime() !== finish.getTime();

      if (!isChanged) {
        toast.info('Изменения отсутствуют');
        return;
      }

      await toast.promise(
        updateBooking(booking.documentId, {
          roomId: room.id,
          start,
          finish,
        }),
        {
          loading: 'Сохранение изменений...',
          success: 'Бронирование обновлено',
          error: (error) =>
            error instanceof Error ? error.message : 'Не удалось обновить бронирование',
        }
      );

      close();
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!booking) {
      return;
    }

    await toast.promise(deleteBooking(booking.documentId), {
      loading: 'Удаление бронирования...',
      success: 'Бронирование удалено',
      error: 'Не удалось удалить бронирование',
    });

    close();
  };

  const onInvalid = (errors: FieldErrors<BookingFormValues>): void => {
    const firstError = Object.values(errors).find(Boolean);

    toast.error(firstError?.message ?? 'Форма заполнена неверно');
  };

  return (
    <form onSubmit={form.handleSubmit(submit, onInvalid)} className="space-y-6">
      <BookingFormFields control={form.control} />

      <BookingFormActions
        mode={mode}
        loading={form.formState.isSubmitting}
        onClose={close}
        onDelete={handleDelete}
      />
    </form>
  );
}
