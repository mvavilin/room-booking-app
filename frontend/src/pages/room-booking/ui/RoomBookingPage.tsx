import { Header } from '@widgets/header';
import { BookingTimeline } from '@widgets/booking-timeline';
import { BookingDialog } from '@widgets/booking-dialog';

import { Container, Main, TypographyH2, TypographyP } from '@shared/ui';

export function RoomBookingPage(): React.JSX.Element {
  return (
    <>
      <Header />

      <Main>
        <Container>
          <TypographyH2>Бронирование переговорных комнат</TypographyH2>

          <TypographyP>Выберите комнату и удобное время</TypographyP>

          <div className="flex justify-center py-6">
            <BookingTimeline />
          </div>
        </Container>
      </Main>

      <BookingDialog />
    </>
  );
}
