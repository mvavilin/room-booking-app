import { useEffect } from 'react';
import { Card, TypographyH3 } from '@shared/ui';
import { useRoomStore } from '@entities/room';
import { RoomItem } from '@widgets/room-list';

export function RoomList(): React.JSX.Element {
  const rooms = useRoomStore((state) => state.rooms);
  const getRooms = useRoomStore((state) => state.getRooms);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <Card className="w-full rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <TypographyH3>Комнаты</TypographyH3>
      </div>

      <div className="flex flex-col gap-3">
        {rooms.map((room) => (
          <RoomItem key={room.documentId} room={room} />
        ))}
      </div>
    </Card>
  );
}
