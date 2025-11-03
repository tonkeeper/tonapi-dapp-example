import { useEffect, useMemo, useState } from 'react';

import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { Address } from '@ton/core';
import { JettonBalance } from '@ton-api/client';

import './App.css';
import { Logo } from './components/Logo';
import { isValidAddress } from './utils/address';
import { JettonList } from './components/JettonList';
import { SendJettonModal } from './components/SendJettonModal';
import ta from './tonapi';

function App() {
  const [jettons, setJettons] = useState<JettonBalance[] | null>(null);
  const [selectedJetton, setSelectedJetton] = useState<JettonBalance | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const connectedAddressString = useTonAddress();
  const connectedAddress = useMemo(() => {
    return isValidAddress(connectedAddressString)
      ? Address.parse(connectedAddressString)
      : null;
  }, [connectedAddressString]);

  useEffect(() => {
    if (!connectedAddress) {
      setJettons(null);
      return;
    }

    ta.accounts
      .getAccountJettonsBalances(connectedAddress)
      .then((res) => setJettons(res.balances))
      .catch((e) => {
        console.error(e);
        setError(e.message || 'Failed to fetch jettons');
        setJettons(null);
      });
  }, [connectedAddress]);

  return (
    <>
      <TonConnectButton style={{ marginLeft: 'auto' }} />

      <a href="https://tonapi.io" target="_blank" className="logo">
        <Logo />
      </a>

      <h1>TonApi dApp Example</h1>
      {connectedAddress ? (
        <>
          <JettonList
            className="card"
            jettons={jettons}
            onSendClick={setSelectedJetton}
          />
          {error && <p className="error">{error}</p>}
          {selectedJetton && connectedAddress && (
            <SendJettonModal
              senderAddress={connectedAddress}
              jetton={selectedJetton}
              onClose={() => setSelectedJetton(null)}
            />
          )}
        </>
      ) : (
        <div className="centered-message">
          <p>Connect your wallet to use the dApp</p>
        </div>
      )}
    </>
  );
}

export default App;
