import { type PropsWithChildren } from 'react';

function TypographyH1({ children }: PropsWithChildren): React.JSX.Element {
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

function TypographyH2({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <h2
      className="
        scroll-m-20
        border-b
        pb-2
        text-2xl
        md:text-3xl
        font-semibold
        tracking-tight
        first:mt-0
      "
    >
      {children}
    </h2>
  );
}

function TypographyH3({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <h3
      className="
        scroll-m-20
        text-2xl
        font-semibold
        tracking-tight
      "
    >
      {children}
    </h3>
  );
}

function TypographyH4({ children }: PropsWithChildren): React.JSX.Element {
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

function TypographyP({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <p
      className="
        leading-7
        not-first:mt-6
      "
    >
      {children}
    </p>
  );
}

export { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyP };
