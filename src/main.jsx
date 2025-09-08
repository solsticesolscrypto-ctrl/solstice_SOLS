
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App.jsx'
import './index.css'
import SolanaWalletProvider from './SolanaWalletProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <HashRouter>
        <SolanaWalletProvider>
          <App />
        </SolanaWalletProvider>
      </HashRouter>
    </HelmetProvider>
  </StrictMode>,
)
