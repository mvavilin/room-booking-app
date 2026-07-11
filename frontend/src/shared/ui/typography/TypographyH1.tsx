import { type PropsWithChildren } from 'react';

export function TypographyH1({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <h1
      className="
        scroll-m-20
        text-2xl
        sm:text-3xl
        md:text-4xl
        font-extrabold
        tracking-tight
        text-balance
      "
    >
      {children}
    </h1>
  );
}
