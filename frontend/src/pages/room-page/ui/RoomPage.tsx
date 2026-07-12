import { useEffect } from 'react';
import { ArrowLeft, Loader2, TriangleAlert, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRoomStore } from '@entities/room';

import { Header } from '@widgets/header';
// import { RoomBookingWeek } from '@widgets/room-booking-dialog/ui/RoomBookingWeek';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Separator,
  TypographyH2,
  TypographyP,
} from '@shared/ui';

export function RoomPage(): React.JSX.Element {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  const room = useRoomStore((state) => state.currentRoom);
  const loading = useRoomStore((state) => state.loading);
  const error = useRoomStore((state) => state.error);
  const loadRoom = useRoomStore((state) => state.loadRoom);

  useEffect(() => {
    if (!documentId) {
      navigate('/404', {
        replace: true,
      });

      return;
    }

    void loadRoom(documentId);
  }, [documentId, navigate, loadRoom]);

  function handleRetry(): void {
    if (documentId) {
      void loadRoom(documentId);
    }
  }

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
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <TriangleAlert className="size-10 text-destructive" />

        <p>Не удалось загрузить информацию о комнате.</p>

        <Button onClick={handleRetry}>Повторить</Button>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="py-8">
        <Container>
          <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 size-4" />
            Назад
          </Button>

          <TypographyH2>Комната №{room.roomId}</TypographyH2>

          <TypographyP>Информация о комнате и бронирования на текущую неделю.</TypographyP>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Информация о комнате</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Номер комнаты</p>

                <p className="text-xl font-semibold">№{room.roomId}</p>
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

          <Separator className="my-8" />

          <TypographyH2>Бронирования</TypographyH2>

          <TypographyP>
            Выберите время для создания бронирования или измените существующее.
          </TypographyP>

          <div className="mt-8">{/* <RoomBookingWeek room={room} /> */}</div>
        </Container>
      </main>
    </>
  );
}
