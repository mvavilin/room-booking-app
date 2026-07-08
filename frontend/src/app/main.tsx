import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@app/index.css';
import App from '@app/App';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
