import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, RoomBookingPage, NotFoundPage, RoomPage } from '@pages';

export function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/booking" element={<RoomBookingPage />} />

      <Route path="/404" element={<NotFoundPage />} />

      <Route path="/rooms/:documentId" element={<RoomPage />} />

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
