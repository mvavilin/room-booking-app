import { Layout, Toaster } from '@shared/ui';
import { RoomBookingPage } from '@pages/room-booking-page';

export default function App(): React.JSX.Element {
  return (
    <Layout>
      <RoomBookingPage />
      <Toaster />
    </Layout>
  );
}
