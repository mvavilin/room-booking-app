import { Loader2, TriangleAlert } from 'lucide-react';

import { useParams } from 'react-router-dom';

import { useRoomStore } from '@entities/room';

import { Header } from '@widgets/header';
import { RoomPageContent } from '@widgets/room-page-content';

import { Button } from '@shared/ui';

import { useLoadRoom } from '@features/load-room';

export function RoomPage(): React.JSX.Element {
  const { documentId } = useParams<{
    documentId: string;
  }>();

  useLoadRoom(documentId);

  const room = useRoomStore((state) => state.activeRoom);

  const loading = useRoomStore((state) => state.activeRoomLoading);

  const error = useRoomStore((state) => state.activeRoomError);

  const loadRoom = useRoomStore((state) => state.loadRoom);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center gap-2">
        <Loader2 className="size-5 animate-spin" />
        Загрузка комнаты...
      </div>
    );
  }

  if (error || !room) {
    return (
      <>
        <Header />

        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <TriangleAlert className="size-10 text-destructive" />

          <p>Не удалось загрузить информацию о комнате.</p>

          <Button
            onClick={() => {
              if (documentId) {
                void loadRoom(documentId);
              }
            }}
          >
            Повторить
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <RoomPageContent room={room} />
    </>
  );
}
