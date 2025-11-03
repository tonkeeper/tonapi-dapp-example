import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TonConnectUIProvider manifestUrl="https://tonkeeper.github.io/tonapi-dapp-example/tonconnect-manifest.json">
            <App />
        </TonConnectUIProvider>
    </StrictMode>
);
