import { Link } from 'react-router-dom';

import { Header } from '@widgets/header';
import { NotFoundImage } from '@pages/not-found';
import { Button, Container, Main, TypographyH2, TypographyP } from '@shared/ui';

export function NotFoundPage(): React.JSX.Element {
  return (
    <>
      <Header />

      <Main>
        <Container
          className="
            flex flex-1 flex-col items-center justify-center
            gap-x-12 gap-y-6
            lg:flex-row
          "
        >
          <div
            className="
              flex max-w-96 items-center justify-center
              overflow-hidden rounded-full
            "
          >
            <img src={NotFoundImage} alt="404" className="size-full object-contain" />
          </div>

          <div className="max-w-96 space-y-6 text-center lg:text-left">
            <TypographyH2>Страница не найдена</TypographyH2>

            <TypographyP>
              Возможно, страница была удалена, перемещена или вы перешли по неверной ссылке.
            </TypographyP>

            <Button size="lg">
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </Container>
      </Main>
    </>
  );
}
