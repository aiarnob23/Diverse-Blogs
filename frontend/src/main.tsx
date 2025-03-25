
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';
import AuthProvider from './context/AuthContext';
import React from 'react';
import { AlertProvider } from './context/AlertContext';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>
);
