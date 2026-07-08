import { type PropsWithChildren } from 'react';

export const TypographyP = ({ children }: PropsWithChildren) => {
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
};
