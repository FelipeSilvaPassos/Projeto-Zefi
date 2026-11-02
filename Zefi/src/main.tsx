
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import { UsuarioProvider } from './context/UsuarioContext';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <AppRoutes />
      </UsuarioProvider>
    </BrowserRouter>
  </StrictMode>,
);
