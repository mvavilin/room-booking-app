import { type PropsWithChildren } from 'react';

export function TypographyP({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <p
      className="
        leading-7
        [&:not(:first-child)]:mt-6
      "
    >
      {children}
    </p>
  );
}
