import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import AppRouter from './router';

document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
