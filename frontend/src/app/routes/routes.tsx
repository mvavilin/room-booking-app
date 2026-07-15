import { HashRouter } from 'react-router-dom';
import { AppRoutes } from '@app';

export function RouterProvider(): React.JSX.Element {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
