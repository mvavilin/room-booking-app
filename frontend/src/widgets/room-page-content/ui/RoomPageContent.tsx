import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RoomDto } from '@entities/room';
import { RoomInfo } from '@widgets/room-info';
import { RoomBookingWeek } from '@widgets/room-booking-week';
import { BookingDialog } from '@widgets/booking-dialog';
import { Button, Container, Main, Separator, TypographyH2, TypographyP } from '@shared/ui';

interface Properties {
  room: RoomDto;
}

export function RoomPageContent({ room }: Properties): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Main>
        <Container>
          <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 size-4" />
            Назад
          </Button>

          <TypographyH2>Комната №{room.roomNumber}</TypographyH2>

          <TypographyP>Информация о комнате и бронированиях на текущую неделю</TypographyP>

          <RoomInfo room={room} />

          <Separator className="my-8" />

          <TypographyH2>Бронирования</TypographyH2>

          <TypographyP>
            Выберите время для создания бронирования или измените существующее.
          </TypographyP>

          <div className="mt-8">
            <RoomBookingWeek room={room} />
          </div>
        </Container>
      </Main>

      <BookingDialog />
    </>
  );
}
