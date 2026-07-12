import { BookingDialog } from '@widgets/booking-editor';
import { Header } from '@widgets/header';
import { BookingTimeline } from '@widgets/booking-timeline';
import { Container, TypographyH2, TypographyP } from '@shared/ui';
import { RoomBookingDialog } from '@/widgets/room-booking-dialog/ui/RoomBookingDialog';

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
      <RoomBookingDialog />
    </>
  );
}
