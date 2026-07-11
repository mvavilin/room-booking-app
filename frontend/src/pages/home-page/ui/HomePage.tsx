import { useNavigate } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Container, TypographyH2, TypographyP, Button } from '@shared/ui';

export function HomePage(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="py-8">
        <Container>
          <TypographyH2>Упростите процесс бронирования переговорных комнат</TypographyH2>

          <TypographyP>
            Забудьте о трудностях с поиском свободного места для переговоров в вашем. Назначайте
            встречи всего в два клика.
          </TypographyP>

          <div className="mt-8">
            <Button onClick={() => navigate('/booking')}>Открыть</Button>
          </div>
        </Container>
      </main>
    </>
  );
}
