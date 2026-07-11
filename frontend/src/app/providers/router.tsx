import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from '@pages/home-page';
import { RoomBookingPage } from '@pages/room-booking-page';
import { NotFoundPage } from '@pages/not-found-page';

export function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/booking" element={<RoomBookingPage />} />

      <Route path="/404" element={<NotFoundPage />} />

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
