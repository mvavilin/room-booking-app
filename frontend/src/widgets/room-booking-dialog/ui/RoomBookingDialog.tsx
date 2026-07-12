import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui';
import { useRoomBookingDialogStore } from '../model/room-booking-dialog-store';

export function RoomBookingDialog(): React.JSX.Element {
  const open = useRoomBookingDialogStore((s) => s.open);
  const room = useRoomBookingDialogStore((s) => s.room);
  const close = useRoomBookingDialogStore((s) => s.closeDialog);

  if (!room) return <></>;

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Комната №{room.roomId}</DialogTitle>
          <DialogDescription className="space-y-1">
            <p>Вместимость: {room.capacity} чел.</p>

            {room.description && <p>{room.description}</p>}
          </DialogDescription>
        </DialogHeader>

        {/* таблица недели */}
      </DialogContent>
    </Dialog>
  );
}
