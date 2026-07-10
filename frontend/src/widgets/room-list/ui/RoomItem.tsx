import { DoorOpen, Info } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Button,
} from '@shared/ui';

import type { RoomDto } from '@entities/room';
import { toast } from 'sonner';

export function RoomItem({ room }: { room: RoomDto }): React.JSX.Element {
  return (
    <Item className="w-full">
      <ItemMedia variant="icon">
        <DoorOpen className="size-5" />
      </ItemMedia>

      <ItemContent>
        <ItemTitle>Комната №{room.roomId}</ItemTitle>

        <ItemDescription>{room.description}</ItemDescription>

        <ItemDescription>Вместимость: {room.capacity} человек</ItemDescription>
      </ItemContent>

      <ItemActions>
        <Button size="icon" variant="ghost" onClick={() => toast.success('Модалка открывается...')}>
          <Info className="size-5" />
        </Button>
      </ItemActions>
    </Item>
  );
}
