import { Users } from 'lucide-react';

import type { RoomDto } from '@entities/room';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@shared/ui';

interface Properties {
  room: RoomDto;
}

export function RoomInfo({ room }: Properties): React.JSX.Element {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Информация о комнате</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Номер комнаты</p>

          <p className="text-xl font-semibold">№{room.roomNumber}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Вместимость</p>

          <Badge variant="secondary" className="mt-2">
            <Users className="mr-1 size-4" />
            {room.capacity} человек
          </Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Описание</p>

          <p className="mt-2">{room.description || 'Нет описания'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
