import { BookingForm } from '@features/booking-form';

import { useBookingStore } from '@entities/booking';
import { useRoomStore } from '@entities/room';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui';

export function BookingDialog(): React.JSX.Element {
  const isOpen = useBookingStore((state) => state.isOpenBookingDialog);
  const mode = useBookingStore((state) => state.bookingDialogMode);
  const close = useBookingStore((state) => state.closeBookingDialog);

  const activeRoom = useRoomStore((state) => state.activeRoom);

  const title = mode === 'create' ? 'Новое бронирование' : 'Редактирование бронирования';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="sm:max-w-lg p-4">
        <DialogHeader>
          <DialogTitle className="pr-7">
            {title} комнаты № {activeRoom?.roomNumber}
          </DialogTitle>
        </DialogHeader>

        <BookingForm />
      </DialogContent>
    </Dialog>
  );
}
