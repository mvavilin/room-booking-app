import { Layout, Toaster } from '@shared/ui';
import { RouterProvider } from '@app/index';

export default function App(): React.JSX.Element {
  return (
    <Layout>
      <RouterProvider />

      <Toaster />
    </Layout>
  );
}
