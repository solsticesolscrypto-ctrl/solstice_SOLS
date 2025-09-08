import { useState } from 'react';

/**
 * Hook universal para conectar Phantom de forma robusta y reutilizable.
 * Devuelve: { walletType, address, connect, disconnect, error, loading }
 */
export function useWalletConnect() {
  const [walletType, setWalletType] = useState(null); // 'phantom' | null
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const connect = async (type) => {
    setLoading(true);
    setError('');
    try {
      if (type === 'phantom') {
  setError('Solo se soporta Phantom en este dApp.');
        console.error('Tipo de wallet no soportado:', type);
      }
    } catch (err) {
      setError(err.message || 'Error inesperado al conectar la wallet');
      console.error('Error al conectar wallet:', err);
    }
    setLoading(false);
  };

  const disconnect = () => {
    setWalletType(null);
    setAddress('');
    setError('');
  };

  return { walletType, address, connect, disconnect, error, loading };
}
