import { type PropsWithChildren } from 'react';

export function Main({ children }: PropsWithChildren): React.JSX.Element {
  return <div className="flex flex-1 py-6">{children}</div>;
}
