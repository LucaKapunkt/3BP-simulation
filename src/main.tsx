/**
 * Einstiegspunkt der React-Anwendung
 * 
 * Diese Datei initialisiert die React-Anwendung und rendert die Hauptkomponente (App)
 * in den DOM. Sie nutzt den StrictMode für zusätzliche Entwicklungschecks und
 * besseres Debugging.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
