import { Container } from '@shared/ui';
import { CalendarCheck } from 'lucide-react';
import { TypographyH1 } from '@shared/ui/typography';

export function Header(): React.JSX.Element {
  return (
    <header className="bg-background-inverse text-foreground-inverse">
      <Container>
        <div className="flex h-16 items-center">
          <CalendarCheck className="mr-3 h-10 w-10" aria-hidden="true" />

          <TypographyH1>Room Booking</TypographyH1>
        </div>
      </Container>
    </header>
  );
}
