import { Header } from '@widgets/header';
import { Container } from '@shared/ui';
import { TypographyH2, TypographyP } from '@shared/ui';
import { BookingTimeline } from '@widgets/booking-timeline';
import { BookingDialog } from '@features/booking-editor';

export function RoomBookingPage(): React.JSX.Element {
  return (
    <>
      <Header />

      <main className="py-8">
        <Container>
          <TypographyH2>Упростите процесс бронирования переговорных комнат</TypographyH2>

          <TypographyP>
            Забудьте о трудностях с поиском свободного места для переговоров в вашем офисе.
            Назначайте встречи всего в два клика, выбирая то помещение, которое идеально подойдет
            для решения ваших задач.
          </TypographyP>

          <div className="py-8 flex justify-center">
            <BookingTimeline />
          </div>
        </Container>
      </main>

      <BookingDialog></BookingDialog>
    </>
  );
}
