import { Header } from '@widgets/header';
import { Container } from '@shared/ui/container';
import { TypographyH2, TypographyP } from '@shared/ui/typography';

export function RoomBookingPage() {
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
        </Container>
      </main>
    </>
  );
}
