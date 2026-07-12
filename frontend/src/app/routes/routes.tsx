import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@app';

export function RouterProvider(): React.JSX.Element {
  return (
    <BrowserRouter basename="/room-booking-app">
      <AppRoutes />
    </BrowserRouter>
  );
}
