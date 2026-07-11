import { CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, TypographyH1 } from '@shared/ui';
import { Navigation } from '@widgets/header';
import { MobileMenu } from '@widgets/header';

export function Header(): React.JSX.Element {
  return (
    <header className="bg-background-inverse text-foreground-inverse">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <div className="flex items-center">
              <CalendarCheck className="mr-3 h-10 w-10" aria-hidden="true" />

              <TypographyH1>Room Booking</TypographyH1>
            </div>
          </Link>

          <div className="hidden md:block">
            <Navigation />
          </div>

          <div className="block md:hidden">
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
