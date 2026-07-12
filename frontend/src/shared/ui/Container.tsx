import { type PropsWithChildren } from 'react';
import { cn } from '@shared/lib';

interface ContainerProperties extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProperties): React.JSX.Element {
  return (
    <div
      className={cn(
        `
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        `,
        className
      )}
    >
      {children}
    </div>
  );
}
