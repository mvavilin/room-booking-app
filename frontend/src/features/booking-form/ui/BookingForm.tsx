import { useBookingForm } from '@features/booking-form';
import { BookingFormFields, BookingFormActions } from '@features/booking-form/ui';

export function BookingForm(): React.JSX.Element {
  const { form, mode, loading, submit, handleDelete, close } = useBookingForm();

  return (
    <form onSubmit={submit} className="space-y-4">
      <BookingFormFields control={form.control} />

      <BookingFormActions mode={mode} loading={loading} onClose={close} onDelete={handleDelete} />
    </form>
  );
}
