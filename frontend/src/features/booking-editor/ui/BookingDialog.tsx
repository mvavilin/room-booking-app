import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui';
import { useBookingDialogStore, BookingForm } from '@features/booking-editor';

export function BookingDialog(): React.JSX.Element {
  const { open, mode, roomNumber, close } = useBookingDialogStore();

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) close();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Редактирование бронирования' : 'Новое бронирование'} комнаты №{' '}
            {roomNumber}
          </DialogTitle>
        </DialogHeader>

        <BookingForm />
      </DialogContent>
    </Dialog>
  );
}
