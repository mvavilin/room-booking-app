import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bookingSchema,
  type BookingFormValues,
  BookingFormFields,
  BookingFormActions,
  useBookingDialogStore,
} from '@features/booking-editor';
import { format } from 'date-fns';

export function BookingForm(): React.JSX.Element {
  const { close, mode, start, finish, booking } = useBookingDialogStore();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      date: new Date(),
      startTime: format(booking?.start ?? start, 'HH:mm'),
      finishTime: format(booking?.finish ?? finish, 'HH:mm'),
    },
  });

  const submit = (data: BookingFormValues): void => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
      <BookingFormFields control={form.control} />

      <BookingFormActions mode={mode} conflict={false} onClose={close} onDelete={() => {}} />
    </form>
  );
}
