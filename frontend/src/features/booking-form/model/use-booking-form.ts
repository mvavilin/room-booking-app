import { useCallback } from 'react';
import { useForm, type FieldErrors, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { addMinutes } from 'date-fns';

import { useBookingStore, type BookingDialogMode } from '@entities/booking';
import { useRoomStore } from '@entities/room';

import {
  bookingFormSchema,
  type BookingFormValues,
  formatTimeForForm,
  createBookingAction,
  updateBookingAction,
  deleteBookingAction,
} from '@features/booking-form';

interface UseBookingFormReturn {
  form: UseFormReturn<BookingFormValues>;
  mode: BookingDialogMode;
  loading: boolean;
  submit: (error?: React.BaseSyntheticEvent) => Promise<void>;
  handleDelete: () => Promise<void>;
  close: () => void;
}

export function useBookingForm(): UseBookingFormReturn {
  const mode = useBookingStore((state) => state.bookingDialogMode);
  const close = useBookingStore((state) => state.closeBookingDialog);

  const activeRoom = useRoomStore((state) => state.activeRoom);
  const activeBooking = useBookingStore((state) => state.activeBooking);
  const startTime = useBookingStore((state) => state.startTime);

  const createBooking = useBookingStore((state) => state.createBooking);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);

  const finishTime: Date | undefined = activeBooking?.finish
    ? addMinutes(activeBooking.finish, 1)
    : addMinutes(startTime, 30);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: startTime,
      startTime: formatTimeForForm(activeBooking?.start ?? startTime),
      finishTime: formatTimeForForm(finishTime),
    },
  });

  const submit = useCallback(
    async (data: BookingFormValues): Promise<void> => {
      if (activeRoom === undefined) return;

      if (mode === 'create') {
        await createBookingAction(data, {
          activeRoom,
          createBookingFn: createBooking,
          onSuccess: close,
        });
        return;
      }

      if (mode === 'edit' && activeBooking) {
        await updateBookingAction(data, {
          activeRoom,
          activeBooking,
          updateBookingFn: updateBooking,
          onSuccess: close,
        });
      }
    },
    [mode, activeRoom, activeBooking, createBooking, updateBooking, close]
  );

  const handleDelete = useCallback(async (): Promise<void> => {
    if (activeRoom === undefined || activeBooking === undefined) return;

    await deleteBookingAction({
      activeRoom,
      activeBooking,
      deleteBookingFn: deleteBooking,
      onSuccess: close,
    });
  }, [activeRoom, activeBooking, deleteBooking, close]);

  const onInvalid = useCallback((errors: FieldErrors<BookingFormValues>): void => {
    const firstError = Object.values(errors).find(Boolean);
    toast.error(firstError?.message ?? 'Форма заполнена неверно');
  }, []);

  return {
    form,
    mode,
    loading: form.formState.isSubmitting,
    submit: form.handleSubmit(submit, onInvalid),
    handleDelete,
    close,
  };
}
