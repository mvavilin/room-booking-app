import { useNavigate } from 'react-router-dom';

import { Header } from '@widgets/header';

import { Button, Container, Main, TypographyH2, TypographyP } from '@shared/ui';
import { DemoVideo } from '@/shared/ui/demo-video/DemoVideo';

export function HomePage(): React.JSX.Element {
  const navigate = useNavigate();

  function handleOpenBooking(): void {
    navigate('/booking');
  }

  return (
    <>
      <Header />

      <Main>
        <Container>
          <TypographyH2>Упростите процесс бронирования переговорных комнат</TypographyH2>

          <TypographyP>
            Забудьте о трудностях с поиском свободной переговорной комнаты. Назначайте встречи всего
            в два клика.
          </TypographyP>

          <div className="mt-6">
            <Button onClick={handleOpenBooking}>Открыть бронирования</Button>
          </div>

          <DemoVideo />
        </Container>
      </Main>
    </>
  );
}
