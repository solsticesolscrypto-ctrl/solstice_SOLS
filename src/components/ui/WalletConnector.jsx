import React, { useState, useEffect } from 'react';

const WALLET_TYPES = {
  PHANTOM: 'Phantom',
  NONE: null,
};

const getWalletProvider = () => {
  if (window?.solana && window.solana.isPhantom) return WALLET_TYPES.PHANTOM;
  return WALLET_TYPES.NONE;
};

const WalletConnector = () => {
  const [walletType, setWalletType] = useState(WALLET_TYPES.NONE);
  const [account, setAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setWalletType(getWalletProvider());
  }, []);

  const connectWallet = async () => {
    const type = getWalletProvider();
    setWalletType(type);
    if (type === WALLET_TYPES.PHANTOM) {
      try {
        const resp = await window.solana.connect();
        setAccount(resp.publicKey.toString());
        setShowModal(true);
      } catch (err) {
        const msg = err && err.message ? err.message : JSON.stringify(err);
        alert('Error al conectar Phantom: ' + msg);
        console.error('Phantom error:', err);
      }
    } else {
      alert('No se detectó ninguna wallet compatible.');
    }
  };

  const disconnectWallet = async () => {
    if (walletType === WALLET_TYPES.PHANTOM && window.solana?.isConnected) {
      await window.solana.disconnect();
    }
    setAccount(null);
    setShowModal(false);
  };

  const renderWalletModal = () => {
  if (!showModal || !account) return null;
  if (walletType === WALLET_TYPES.PHANTOM) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-purple-900 rounded-lg p-6 shadow-lg w-80 text-center text-white">
            <img src={`${import.meta.env.BASE_URL}solstice-logo.png`} alt="Phantom" className="mx-auto mb-4 w-16 h-16" />
            <h2 className="text-xl font-bold mb-2">Phantom Conectado</h2>
            <p className="mb-4 text-sm break-all">{account}</p>
            <button onClick={disconnectWallet} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">{t['disconnect'] || 'Desconectar'}</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderWalletModal()}
    </div>
  );
};

export default WalletConnector;
