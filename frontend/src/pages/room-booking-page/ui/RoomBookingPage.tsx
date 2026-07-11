import { BookingDialog } from '@features/booking-editor';
import { Header } from '@widgets/header';
import { BookingTimeline } from '@widgets/booking-timeline';
import { Container, TypographyH2, TypographyP } from '@shared/ui';

export function RoomBookingPage(): React.JSX.Element {
  return (
    <>
      <Header />

      <main className="py-8">
        <Container>
          <TypographyH2>Бронирование переговорных комнат</TypographyH2>

          <TypographyP>Выберите комнату и удобное время</TypographyP>

          <div className="py-8 flex justify-center">
            <BookingTimeline />
          </div>
        </Container>
      </main>

      <BookingDialog />
    </>
  );
}
