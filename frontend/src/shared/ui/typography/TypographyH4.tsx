import { type PropsWithChildren } from 'react';

export function TypographyH4({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <h4
      className="
        scroll-m-20
        text-xl
        font-semibold
        tracking-tight
      "
    >
      {children}
    </h4>
  );
}
