import { Button, DialogFooter } from '@shared/ui';
import type { BookingDialogMode } from '@features/booking-editor';

interface Properties {
  mode: BookingDialogMode;
  conflict: boolean;
  onClose(): void;
  onDelete(): void;
}

export function BookingFormActions({
  mode,
  conflict,
  onClose,
  onDelete,
}: Properties): React.JSX.Element {
  return (
    <DialogFooter>
      {mode === 'edit' ? (
        <>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Удалить
          </Button>

          <Button type="submit" disabled={conflict}>
            Сохранить
          </Button>
        </>
      ) : (
        <>
          <Button type="button" variant="outline" onClick={onClose}>
            Отмена
          </Button>

          <Button type="submit" disabled={conflict}>
            Забронировать
          </Button>
        </>
      )}
    </DialogFooter>
  );
}
