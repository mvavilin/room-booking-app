import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRoomStore } from '@entities/room';

export function useLoadRoom(documentId?: string): void {
  const navigate = useNavigate();

  const loadRoom = useRoomStore((state) => state.loadRoom);

  useEffect(() => {
    if (documentId === undefined) {
      navigate('/404', { replace: true });
      return;
    }

    void loadRoom(documentId);
  }, [documentId, navigate, loadRoom]);
}
