import { Link } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Container, TypographyH2, TypographyP, Button } from '@shared/ui';

export function NotFoundPage(): React.JSX.Element {
  return (
    <>
      <Header />

      <main className="py-8">
        <Container>
          <TypographyH2>Страница не найдена</TypographyH2>

          <TypographyP>Возможно, вы перешли по неправильной ссылке.</TypographyP>

          <div className="mt-6">
            <Button>
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}
