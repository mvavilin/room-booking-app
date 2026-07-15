import { Layout, Toaster } from '@shared/ui';
import { RouterProvider } from '@app';

export default function App(): React.JSX.Element {
  return (
    <>
      <Layout>
        <RouterProvider />
      </Layout>
      <Toaster />
    </>
  );
}
