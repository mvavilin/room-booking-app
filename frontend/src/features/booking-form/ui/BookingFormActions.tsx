import { Button, DialogFooter } from '@shared/ui';
import type { BookingDialogMode } from '@entities/booking';

interface Properties {
  mode: BookingDialogMode;
  loading: boolean;
  onClose(): void;
  onDelete(): void;
}

export function BookingFormActions({
  mode,
  loading,
  onClose,
  onDelete,
}: Properties): React.JSX.Element {
  return (
    <DialogFooter>
      {mode === 'edit' ? (
        <>
          <Button type="button" variant="destructive" onClick={onDelete} disabled={loading}>
            Удалить
          </Button>

          <Button type="submit" disabled={loading}>
            Сохранить
          </Button>
        </>
      ) : (
        <>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Отмена
          </Button>

          <Button type="submit" disabled={loading}>
            Забронировать
          </Button>
        </>
      )}
    </DialogFooter>
  );
}
