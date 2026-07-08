import { type PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  return <div className="min-h-screen w-full">{children}</div>;
}
