import { type PropsWithChildren } from 'react';

export function Container({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <div
      className="
        w-full
        mx-auto

        px-4
        sm:px-6
        lg:px-8

        max-w-7xl
      "
    >
      {children}
    </div>
  );
}
