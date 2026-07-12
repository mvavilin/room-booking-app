import { type PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren): React.JSX.Element {
  return <div className="flex min-h-screen flex-col w-full">{children}</div>;
}
