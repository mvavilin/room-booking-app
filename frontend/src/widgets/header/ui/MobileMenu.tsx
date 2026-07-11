import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, Button } from '@shared/ui';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Navigation } from '@widgets/header';

export function MobileMenu(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu />
        <span className="sr-only">Открыть меню</span>
      </SheetTrigger>

      <SheetContent side="right" className="bg-background-inverse text-foreground-inverse">
        <SheetHeader className="text-foreground-inverse">
          <SheetTitle className="text-foreground-inverse">Меню</SheetTitle>
        </SheetHeader>

        <Navigation onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
